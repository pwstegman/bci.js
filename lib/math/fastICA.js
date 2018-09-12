const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/type/complex'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/matrix'));
math.import(require('mathjs/lib/function/statistics'));
math.import(require('mathjs/lib/function/probability'));
math.import(require('mathjs/lib/function/utils'));

const numeric = require('numeric');
const stat = require('pw-stat');

/**
 * FastICA algorithm for independent component analysis
 * @memberof module:webbci
 * @param {number[][]} signals - The mixed signals. Each row should be a signal and each column a sample.
 * @param {Object} options
 * @param {number} [options.maxIterations=1000] - Maximum number of iterations
 * @param {boolean} [options.debug=false] - If true, prints out debug information while running
 * @returns {Object} An object with the following values: {source: the estimated source matrix, weights: the estimated unmixing matrix, whitening: the computer whitening matrix, iterations: number of iterations taken to converge on each weight}
 */
function fastICA(signals, options){
    var {maxIterations, debug} = Object.assign({
        maxIterations: 1000,
        debug: false
	}, options);

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

    let whitening = math.multiply(math.diag(D.map(i => math.pow(i, -1/2))), math.transpose(V));

    let whitened = math.multiply(
        whitening,
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

    let totalIterations = [];

    for(let p = 0; p < numComponenents; p++){
        let previousWeight = math.clone(weights[p]);

        if(debug){
            console.log((new Date()).toLocaleTimeString(), 'Computing component', p+1, '/', numComponenents);
        }

        for(let i = 0; i < maxIterations; i++){
            // Convergence test
            let a = previousWeight;
            let b = weights[p];
            if(a[0] < 0){ a = math.multiply(-1, a); }
            if(b[0] < 0){ b = math.multiply(-1, b); }
            let delta = math.max(math.dotDivide(math.subtract(a, b), a));
            previousWeight = b;

            if(debug && ((i+1)%10 == 0 || i == 0)){
                console.log((new Date()).toLocaleTimeString(), 'On iteration', i+1, '/', maxIterations, 'with a', delta*100 + '% change');
            }
            
            if(i != 0 && delta < 0.0001){
                totalIterations.push(i);
                
                if(debug){
                    console.log((new Date()).toLocaleTimeString(), 'Converged on iteration', i);
                }
                
                break;
            }

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

    let source = math.multiply(weights, whitened);

    return {
        source: source,
        weights: weights,
        whitening: whitening,
        iterations: totalIterations
    }
}

module.exports = fastICA;