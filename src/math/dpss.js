import { eigs, transpose } from 'mathjs';

/**
 * Compute a symmetric tridiagonal matrix given diagonal and off-diagonal elements
 * @private
 * @param {number[]} diag - The diagonal elements
 * @param {number[]} offdiag - The off-diagonal elements
 * @returns {number[][]} The tridiagonal matrix
 */
function tridiag(diag, offdiag) {
    if(diag.length != offdiag.length + 1) {
        throw new Error('Invalid diag and offdiag lengths');
    }

    let M = [];
    for(let r = 0; r < diag.length; r++) {
        let row = [];
        for(let c = 0; c < diag.length; c++) {
            let value = 0;

            // Diag
            if(r == c) {
                value = diag[r];
            }

            // Offdiag
            else if(r+1 == c) {
                value = offdiag[r];
            }
            else if(c+1 == r) {
                value = offdiag[c];
            }

            row.push(value);
        }
        M.push(row);
    }
    
    return M;
}

/**
 * Linearly interpolate array of values to target length
 * @private
 * @param {number[]} arr - Input array
 * @param {number} N - Target length 
 * @returns {number[]} - Interpolated array
 */
function interpolate(arr, N) {
    let interp = [];
    for(let i = 0; i < N; i++) {
        // Find matching index in original array
        let matching_index = (i / (N - 1)) * (arr.length - 1);

        // See how offset we are from an integer index
        let offset = matching_index % 1;

        // If it's a clean integer, use it
        if(offset === 0) {
            interp.push(arr[matching_index]);
        }
        // If not, interpolate linearly
        else {
            let low = Math.floor(matching_index);
            let high = Math.ceil(matching_index);
            interp.push(arr[low] * (1 - offset) + arr[high] * offset);
        }
    }

    return interp;
}

/**
 * Compute the discrete prolate spheroidal (Slepian) sequences
 * 
 * For lengths greater than 128, DPSSs of length 128 are calculated and then
 * linearly interpolated up to the desired length.
 * 
 * Once the underlying eigenvector method is optimized further, we may be able to increase the
 * length prior to interpolation.
 * 
 * Reference: D. B. Percival and A. T. Walden, "Calculation of Discrete Prolate Spheroidal Sequences," in Spectral Analysis for Physical Applications, pp. 378–390, 1993.
 * 
 * @param {number} length - Length of sequences 
 * @param {number} [NW=4] - Time-half-handwidth (Default 4)
 * @param {number} [K=floor(2*NW-1)] - Number of sequences to return (Default 7)
 */
export function dpss(length, NW = 4, K) {
    if(typeof K === "undefined") K = Math.floor(2 * NW - 1);
    if(K < 1 || K > N) throw new Error('Invalid value for K');
    
    // As eig method is very slow, cap at 128 and interpolate up
    let N = Math.min(length, 128);

    // Calculate half bandwidth
    let W = NW / N;

    // Form tridiag matrix
    let diag = []
    for(let t = 0; t < N; t++) {
        let value = ((N - 1 - 2*t) / 2) ** 2 * Math.cos(2 * Math.PI * W);
        diag.push(value);
    }

    let offdiag = [];
    for(let t = 1; t < N; t++) {
        offdiag.push(t * (N - t) / 2);
    }

    // Compute eigenvectors (sorted by increasing eigenvalue)
    let { vectors } = eigs(tridiag(diag, offdiag));
    vectors = transpose(vectors);

    // Select eigenvectors with K largest eigenvalues
    let result = vectors.slice(vectors.length - K);

    // Flip vectors so they always start greater than 0
    /*
    Formally the expected behavior is they should be positive when symmetric (K is even) or
    begin with a "positive first lobe" when not (K is odd) (Percival and Walden, 1993, p. 379)
    */
    for(let r = 0; r < result.length; r++) {
        if(result[r][0] < 0) {
            for(let c = 0; c < result[r].length; c++) {
                result[r][c] *= -1;
            }
        }
    }

    // Reverse array of vectors
    result = result.reverse();

    // Interpolate up as needed
    if(length > N) {
        // Interpolate linearly
        result = result.map(taper => interpolate(taper, length));
        
        // Rescale to have proper area under curve
        for(let t = 0; t < result.length; t++) {
            let scale = 0;
            for(let i = 0; i < result[t].length; i++) {
                scale += result[t][i] ** 2;
            }
            scale = Math.sqrt(scale);

            for(let i = 0; i < result[t].length; i++) {
                result[t][i] /= scale;
            }
        }
    }

    return result;
}
