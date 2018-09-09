const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/type/complex'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/matrix'));
math.import(require('mathjs/lib/function/statistics'));
math.import(require('mathjs/lib/function/probability'));

const numeric = require('numeric');
const stat = require('pw-stat');

function fastICA(signals, options){
    var {iterations} = Object.assign({
		iterations: 10
	}, options);

    // TODO: Return transformation matrix as well
    let eigs = numeric.eig(stat.cov(math.transpose(signals)));
    let V = eigs.E.x;
    let D = eigs.lambda.x;

    let mean = math.mean(signals, 1);
    let centered = [];
    for(let i = 0; i < signals.length; i++){
        centered.push([]);
        for(let j = 0; j < signals[i].length; j++){
            centered[i].push(signals[i][j] - mean[i]);
        }
    }

    let whitened = math.multiply(
        math.diag(D.map(i => math.pow(i, -1/2))),
        math.transpose(V),
        centered
    );

    let f = (u) => math.dotPow(
        -Math.E,
        math.dotDivide(math.dotPow(u, 2), -2)
    );

    let g = (u) => math.dotMultiply(
        u,
        math.dotPow(Math.E, math.dotDivide(math.dotPow(u, 2), -2))
    );

    let gp = (u) => math.dotMultiply(
        math.subtract(1, math.dotPow(u, 2)),
        math.dotPow(Math.E, math.dotDivide(math.dotPow(u, 2), -2))
    );

    let [N, M] = math.size(whitened);

    // In this case, getting a component for each dimension, but we could opt to use fewer
    let numComponenents = N;
    // Create a weight vector for each component
    let weights = [];
    for(let i = 0; i < numComponenents; i++){
        weights.push(math.random([N]));
    }

    for(let p = 0; p < numComponenents; p++){
        // TODO: convergence test instead of just iterations
        for(let i = 0; i < iterations; i++){
            weights[p] = math.transpose(math.subtract(
                math.multiply(
                    1/M,
                    whitened,
                    math.transpose(g(math.multiply(weights[p], whitened)))
                ),
                math.multiply(
                    1/M,
                    math.sum(gp(math.multiply(weights[p], whitened))),
                    math.transpose(weights[p])
                )
            ));

            for(let j = 0; j < p; j++){
                weights[p] = math.subtract(
                    weights[p],
                    math.multiply(
                        weights[p],
                        math.transpose(weights[j]),
                        weights[j]
                    )
                );
            }

            weights[p] = math.divide(weights[p], math.norm(weights[p]));
        }
    };

    return math.multiply(weights, whitened);
}

module.exports = fastICA;