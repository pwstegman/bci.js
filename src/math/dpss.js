import { eigs, transpose, multiply } from 'mathjs';
import FFT from 'fft.js';
import { nextpow2 } from './nextpow2';

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
 * Compute q, which is used in computing the eigenvalues
 * @param {number[]} E - Eigenvector
 * @returns {number[]} q for the given eigenvector
 */
function computeQ(E) {
    // Copy E into A and store its reverse into B
    let A = new Array(E.length);
    let B = new Array(E.length);

    for(let i = 0; i < E.length; i++) {
        A[i] = E[E.length - i - 1];
        B[i] = E[i];
    }

    // Length of eigenvector
    let N = E.length;

    // We'll use an FFT to compute the convolution
    let fft_len = 2**nextpow2(E.length + N - 1);

    // Pad with zeros to allow for linear convolution via FFT
    for(let i = 0; i < fft_len - N; i++) {
        A.push(0);
        B.push(0);
    }

    // FFT object
    let f = new FFT(fft_len);

    // FFT A
    let out1 = f.createComplexArray();
    f.realTransform(out1, A);
    f.completeSpectrum(out1);

    // FFT B
    let out2 = f.createComplexArray();
    f.realTransform(out2, B);
    f.completeSpectrum(out2);

    // Multiply the complex arrays FFT A and FFT B
    let mult = [];
    for(let i = 0; i < out1.length; i += 2) {
        let a = out1[i];
        let b = out1[i+1];
        let c = out2[i];
        let d = out2[i+1];

        let c1 = a*c - b*d;
        let c2 = a*d + b*c;

        mult.push(c1);
        mult.push(c2);
    }

    // Compute the inverse FFT of the product
    const conv_complex = f.createComplexArray();
    f.inverseTransform(conv_complex, mult);

    // Grab the real components up to the length of the eigenvector
    // (imaginary components are zero)
    let conv = [];
    for(let i = 0; i < N*2; i += 2) {
        conv.push(conv_complex[i]);
    }

    // Return the result
    return conv;
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

    // Compute eigenvalues of the definition equation
    let s = new Array(N);
    s[N-1] = [2 * W];
    const sinc = (x) => Math.sin(Math.PI * x) / (Math.PI * x);
    for(let i = 1; i < N; i++) {
        s[N - i - 1] = [4 * W * sinc(2*W*i)];
    }
    let q = vectors.map(vector => computeQ(vector));
    let all_values = multiply(q, s);

    // Select only top K eigenvalues of definition equation
    // Ensure values are between 0 and 1. (It's possible to get values
    // slightly below 0 or above 1 due to finite precision errors.
    let values = [];
    let num_values = K;
    if(arguments[3]) num_values = all_values.length;
    for(let i = 0; i < num_values; i++) {
        let val = all_values[N - i - 1][0];
        if(val < 0) val = 0;
        else if(val > 1) val = 1;
        values.push(val);
    }

    // Select eigenvectors with K largest eigenvalues
    vectors = vectors.slice(vectors.length - K);

    // Flip vectors so they always start greater than 0
    /*
    Formally the expected behavior is they should be positive when symmetric (K is even) or
    begin with a "positive first lobe" when not (K is odd) (Percival and Walden, 1993, p. 379)
    */
    for(let r = 0; r < vectors.length; r++) {
        if(vectors[r][0] < 0) {
            for(let c = 0; c < vectors[r].length; c++) {
                vectors[r][c] *= -1;
            }
        }
    }

    // Reverse array of vectors
    vectors = vectors.reverse();

    // Interpolate up as needed
    if(length > N) {
        // Interpolate linearly
        vectors = vectors.map(taper => interpolate(taper, length));
        
        // Rescale to have proper area under curve
        for(let t = 0; t < vectors.length; t++) {
            let scale = 0;
            for(let i = 0; i < vectors[t].length; i++) {
                scale += vectors[t][i] ** 2;
            }
            scale = Math.sqrt(scale);

            for(let i = 0; i < vectors[t].length; i++) {
                vectors[t][i] /= scale;
            }
        }
    }

    return {vectors: vectors, values: values};
}
