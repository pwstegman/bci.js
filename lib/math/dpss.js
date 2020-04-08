const math = require('mathjs');

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
 * Compute the discrete prolate spheroidal (Slepian) sequences
 * 
 * This method is quite slow for N > 128. If you need DPSSs of length > 128,
 * it may be best to calculate DPSSs of length 128 and then interpolate.
 * 
 * Reference: D. B. Percival and A. T. Walden, "Calculation of Discrete Prolate Spheroidal Sequences," in Spectral Analysis for Physical Applications, pp. 378–390, 1993.
 * @param {number} N - Length of sequences 
 * @param {number} [NW=4] - Time-half-handwidth (Default 4)
 * @param {number} [K=floor(2*NW-1)] - Number of sequences to return (Default 7)
 */
function dpss(N, NW = 4, K) {
    if(typeof K === "undefined") K = Math.floor(2 * NW - 1);
    if(K < 1 || K > N) throw new Error('Invalid value for K');

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
    let {vectors} = math.eigs(tridiag(diag, offdiag));
    vectors = math.transpose(vectors);

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

    return result;
}

module.exports = dpss;
