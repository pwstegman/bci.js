import { 
    tanh,
    subtract,
    dotPow,
    dotMultiply,
    exp,
    dotDivide,
    transpose,
    abs,
    mean,
    multiply,
    diag,
    pow,
    size,
    random,
    dot,
    norm,
    sum,
    divide,
    clone
} from 'mathjs';
import numeric from 'numeric';
import stat from 'pw-stat';

/**
 * FastICA algorithm for independent component analysis
 * @memberof module:bcijs
 * @function
 * @name fastICA
 * @param {number[][]} signals - The mixed signals. Each row should be a signal and each column a sample.
 * @param {Object} options
 * @param {number} [options.maxIterations=1000] - Maximum number of iterations
 * @param {boolean} [options.debug=false] - If true, prints out debug information while running
 * @param {string} [options.fun=logcosh] - The functional form of the G function used in the approximation of negentropy. Can be either 'exp' or 'logcosh.
 * @returns {Object} An object with the following values: {source: the estimated source matrix, weights: the estimated unmixing matrix, whitening: the computed whitening matrix, iterations: number of iterations taken to converge on each weight}
 */
export function fastICA(signals, options){
    var {maxIterations, debug, fun} = Object.assign({
        maxIterations: 1000,
        debug: false,
        fun: 'logcosh'
    }, options);
    
    let negentropyFunctions = {
        'logcosh': {
            g: (u) => tanh(u),
            gp: (u) => subtract(1, dotPow(tanh(u), 2))
        },
        'exp': {
            g: (u) => dotMultiply(u, exp(dotDivide(dotPow(u, 2), -2))),
            gp: (u) => dotMultiply(subtract(1, dotPow(u, 2)), exp(dotDivide(dotPow(u, 2), -2)))
        }
    };

    if(!negentropyFunctions.hasOwnProperty(fun)){
        throw new Error("Negentropy approximation function must be either 'exp' or 'logcosh'");
    }

    let eigs = numeric.eig(stat.cov(transpose(signals)));
    let V = eigs.E.x;
    let D = eigs.lambda.x;

    /* As covariance matrices are positive semi-definite and symmetric, all eigenvalues are nonnegative.
       Sometimes very small negatives are returned due to issues with numerical precision. This will cause problems
       later as we raise each value to the -1/2 power and complex numbers will break the code. To solve, setting
       D to equal abs(D). Should eventually find a better way to handle eigenvalues that are 0. */
    D = abs(D);

    let mu = mean(signals, 1);
    let centered = [];
    for(let i = 0; i < signals.length; i++){
        centered.push([]);
        for(let j = 0; j < signals[i].length; j++){
            centered[i].push(signals[i][j] - mu[i]);
        }
    }

    let whitening = multiply(diag(D.map(i => pow(i, -1/2))), transpose(V));

    let whitened = multiply(
        whitening,
        centered
    );

    let g = negentropyFunctions[fun].g;
    let gp = negentropyFunctions[fun].gp;

    let [N, M] = size(whitened);

    // In this case, getting a component for each dimension, but we could opt to use fewer
    let numComponenents = N;
    // Create a weight vector for each component
    let weights = [];
    for(let i = 0; i < numComponenents; i++){
        weights.push(random([N]));
    }

    let totalIterations = [];

    for(let p = 0; p < numComponenents; p++){
        let previousWeight = clone(weights[p]);

        if(debug){
            console.log((new Date()).toLocaleTimeString(), 'Computing component', p+1, '/', numComponenents);
        }

        let converged = false;

        for(let i = 0; i < maxIterations; i++){
            // Convergence test
            let a = previousWeight;
            let b = weights[p];
            let cosTheta = dot(a, b) / (norm(a) * norm(b));
            let delta = 1 - abs(cosTheta);
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

            weights[p] = transpose(subtract(
                multiply(
                    1/M,
                    whitened,
                    transpose(g(multiply(weights[p], whitened)))
                ),
                multiply(
                    1/M,
                    sum(gp(multiply(weights[p], whitened))),
                    transpose(weights[p])
                )
            ));

            for(let j = 0; j < p; j++){
                weights[p] = subtract(
                    weights[p],
                    multiply(
                        weights[p],
                        transpose(weights[j]),
                        weights[j]
                    )
                );
            }

            weights[p] = divide(weights[p], norm(weights[p]));
        }

        if(!converged){
            totalIterations.push(maxIterations);
            if(debug){
                console.log('Stopped at maxIterations before converged');
            }
        }
    };

    let source = multiply(weights, whitened);

    return {
        source: source,
        weights: weights,
        whitening: whitening,
        iterations: totalIterations
    }
}
