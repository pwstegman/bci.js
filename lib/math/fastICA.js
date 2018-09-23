const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/type/complex'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/matrix'));
math.import(require('mathjs/lib/function/statistics'));
math.import(require('mathjs/lib/function/probability'));
math.import(require('mathjs/lib/function/utils'));
math.import(require('mathjs/lib/function/trigonometry'));

const numeric = require('numeric');
const stat = require('pw-stat');

/**
 * FastICA algorithm for independent component analysis
 * @memberof module:bcijs
 * @param {number[][]} signals - The mixed signals. Each row should be a signal and each column a sample.
 * @param {Object} options
 * @param {number} [options.maxIterations=1000] - Maximum number of iterations
 * @param {boolean} [options.debug=false] - If true, prints out debug information while running
 * @param {string} [options.fun=logcosh] - The functional form of the G function used in the approximation of negentropy. Can be either 'exp' or 'logcosh.
 * @returns {Object} An object with the following values: {source: the estimated source matrix, weights: the estimated unmixing matrix, whitening: the computed whitening matrix, iterations: number of iterations taken to converge on each weight}
 */
function fastICA(signals, options){
    var {maxIterations, debug, fun} = Object.assign({
        maxIterations: 1000,
        debug: false,
        fun: 'logcosh'
    }, options);
    
    let negentropyFunctions = {
        'logcosh': {
            g: (u) => math.tanh(u),
            gp: (u) => math.subtract(1, math.dotPow(math.tanh(u), 2))
        },
        'exp': {
            g: (u) => math.dotMultiply(u, math.exp(math.dotDivide(math.dotPow(u, 2), -2))),
            gp: (u) => math.dotMultiply(math.subtract(1, math.dotPow(u, 2)), math.exp(math.dotDivide(math.dotPow(u, 2), -2)))
        }
    };

    if(!negentropyFunctions.hasOwnProperty(fun)){
        throw new Error("Negentropy approximation function must be either 'exp' or 'logcosh'");
    }

    let eigs = numeric.eig(stat.cov(math.transpose(signals)));
    let V = eigs.E.x;
    let D = eigs.lambda.x;

    /* As covariance matrices are positive semi-definite and symmetric, all eigenvalues are nonnegative.
       Sometimes very small negatives are returned due to issues with numerical precision. This will cause problems
       later as we raise each value to the -1/2 power and complex numbers will break the code. To solve, setting
       D to equal abs(D). Should eventually find a better way to handle eigenvalues that are 0. */
    D = math.abs(D);

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

    let g = negentropyFunctions[fun].g;
    let gp = negentropyFunctions[fun].gp;

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

        let converged = false;

        for(let i = 0; i < maxIterations; i++){
            // Convergence test
            let a = previousWeight;
            let b = weights[p];
            let cosTheta = math.dot(a, b) / (math.norm(a) * math.norm(b));
            let delta = 1 - math.abs(cosTheta);
            previousWeight = b;

            if(debug && i == 0){
                console.log((new Date()).toLocaleTimeString(), 'On iteration', i+1, '/', maxIterations);
            }

            if(debug && (i+1)%10 == 0){
                console.log((new Date()).toLocaleTimeString(), 'On iteration', i+1, '/', maxIterations, 'with a change of', Math.acos(Math.abs(cosTheta)), 'rad');
            }
            
            if(i != 0 && delta < 5e-11){
                totalIterations.push(i);
                converged = true;
                
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

        if(!converged){
            totalIterations.push(maxIterations);
            if(debug){
                console.log('Stopped at maxIterations before converged');
            }
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