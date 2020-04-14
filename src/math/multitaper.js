import { dpss } from './dpss';
import { periodogram } from './periodogram';

/**
 * Estimate the power spectral density using the multitaper method
 * @param {number[]} signal - The signal
 * @param {number} sample_rate - The sample rate
 * @param {object} options
 * @param {number} [options.nw=4] - The time-halfbandwidth. Default is 4.
 */
export function multitaper(signal, sample_rate, options) {
    let { nw, k, method, _bk, _values, max_iterations } = Object.assign({
        nw: 4,
        k: null,
        method: 'adapt',
        max_iterations: 2,
        _bk: null, // Used internally for adaptive multitaper recursion
        _values: false // Used internally for adaptive multitaper recursion
    }, options);

    // Default k (number of tapers)
    if(k === null) {
        k = Math.floor(nw * 2 - 1);
    }
    
    // In the event of adaptive (of _bk for the recursive part of adaptive), we'll
    // calculate the psd estimate a different way
    let vectors, values, psds;
    if(method != 'adapt' || _bk) {
        // Compute the DPSSs
        let tapers = dpss(signal.length, nw, k, true);
        vectors = tapers.vectors;
        values = tapers.values;

        // Compute periodograms
        psds = vectors.map(taper => periodogram(signal, sample_rate, {window: taper}));
    }

    // Weighted average estimates
    let weights;

    if(_bk !== null) {
        weights = _bk; // Recursive step of adaptive multitaper
    }else  if(method == 'unity') {
        weights = new Array(psds.length).fill(1);
    } else if(method == 'eigen') {
        weights = values;
    } else if(method == 'adapt') {
        // Begin initial estimate with K = 2 tapers and the eigen method
        let mt = multitaper(signal, sample_rate, {nw: nw, k: 2, method: 'eigen', _values: true});

        let frequencies = mt.frequencies;
        let S = mt.estimates;
        let values = mt.values;

        // For now, doing 2 iterations
        for(let i = 0; i < max_iterations; i++) {
            let variance = 0;
            for(let i = 0; i < S.length; i++) variance += S[i];
            variance *= frequencies[1];

            // Calculate weights b(k, f), See: Percival and Walden, 1993, p.368
            let bk = [];
            for(let i = 0; i < k; i++) {
                let b_weights = [];
                for(let j = 0; j < S.length; j++) {
                    b_weights.push(
                        S[j] / (S[j] * values[i] + (1 - values[i]) * variance)
                    );
                }
                bk.push(b_weights);
            }

            // Re-estimate spectrum with weights b(k, f)
            mt = multitaper(signal, sample_rate, {nw: nw, k: k, _bk: bk, _values: true});

            S = mt.estimates;
            values = mt.values;
        }

        return {
            estimates: S,
            frequencies: frequencies
        };
    } else {
        throw new Error('Invalid method');
    }

    let avg = new Array(psds[0].estimates.length).fill(0);

    // If the weights are applied at the vector level
    if(!Array.isArray(weights[0])) {
        for(let p = 0; p < psds.length; p++) {
            for(let i = 0; i < psds[p].estimates.length; i++) {
                avg[i] += psds[p].estimates[i] * weights[p];
            }
        }

        // Sum the weights
        let sum_weights = 0;
        for(let i = 0; i < psds.length; i++) {
            sum_weights += weights[i];
        }

        // Divide by the sum to get an average
        for(let i = 0; i < avg.length; i++) {
            avg[i] /= sum_weights;
        }
    }
    // If the weights are applied at the frequency level (adaptive multitaper)
    else {
        for(let p = 0; p < psds.length; p++) {
            for(let i = 0; i < psds[p].estimates.length; i++) {
                avg[i] += psds[p].estimates[i] * weights[p][i];
            }
        }

        // Sum the weights at each frequency
        let weight_sums = new Array(weights[0].length).fill(0);
        for(let i = 0; i < weights.length; i++) {
            for(let j = 0; j < weights[0].length; j++) {
                weight_sums[j] += weights[i][j];
            }
        }

        // Divide by the sums to get an average
        for(let i = 0; i < avg.length; i++) {
            avg[i] /= weight_sums[i];
        }
    }

    if(_values == true) {
        return {
            estimates: avg,
            frequencies: psds[0].frequencies,
            values: values
        }
    }

    // Return PSD
    return {
        estimates: avg,
        frequencies: psds[0].frequencies
    }
}
