import { dpss } from './dpss';
import { periodogram } from './periodogram';

/**
 * Combined PSDs with weights applied to each tapered PSD
 * @private
 * @param {object[]} psds 
 * @param {number[]} weights 
 * @returns {number[]} Average PSD
 */
function weightedTapers(psds, weights) {
    // Store the average
    let avg = new Array(psds[0].estimates.length).fill(0);

    // Weighted sum
    let sum_weights = 0;
    for(let p = 0; p < psds.length; p++) {
        sum_weights += weights[p];

        for(let f = 0; f < psds[p].estimates.length; f++) {
            avg[f] += psds[p].estimates[f] * weights[p];
        }
    }

    // Divide by the sum to get weighted average
    for(let f = 0; f < avg.length; f++) {
        avg[f] /= sum_weights;
    }

    return avg;
}

/**
 * Combined PSDs with weights applied to each tapered PSD and each frequency bin
 * @private
 * @param {object[]} psds 
 * @param {number[][]} weights 
 * @returns {number[]} Average PSD
 */
function weightedTapersFrequencies(psds, weights) {
    // Store the average
    let avg = new Array(psds[0].estimates.length).fill(0);

    let num_frequencies = psds[0].estimates.length;

    // Weighted sum
    let weight_sums = new Array(num_frequencies).fill(0);
    for(let p = 0; p < psds.length; p++) {
        for(let f = 0; f < num_frequencies; f++) {
            avg[f] += psds[p].estimates[f] * weights[p][f];
            weight_sums[f] += weights[p][f];
        }
    }

    // Divide by the sums to get an average
    for(let f = 0; f < num_frequencies; f++) {
        avg[f] /= weight_sums[f];
    }

    return avg;
}

/**
 * Calculate weights at the taper and frequency level for adaptive multitaper
 * @param {number[]} spectrum - Current estimate of the spectrum
 * @param {number[]} eigenvalues - Eigenvalues of tapers
 * @param {number} variance - Variance of signal
 * @return {number[][]} The weights
 */
function calculateAdaptiveWeights(spectrum, eigenvalues, variance) {
    // Calculate weights b(k, f)^2*eigenvalues(k), See: Percival and Walden, 1993, p.368
    let weights = [];
    for(let i = 0; i < eigenvalues.length; i++) {
        let f_weights = [];
        for(let j = 0; j < spectrum.length; j++) {
            f_weights.push(
                (spectrum[j] / (spectrum[j] * eigenvalues[i] + (1 - eigenvalues[i]) * variance)) ** 2 * eigenvalues[i]
            );
        }
        weights.push(f_weights);
    }
    return weights;
}

/**
 * Estimate the power spectral density using the multitaper method
 * @param {number[]} signal - The signal
 * @param {number} sample_rate - The sample rate
 * @param {object} options
 * @param {number} [options.nw=4] - The time-halfbandwidth. Default is 4.
 */
export function multitaper(signal, sample_rate, options) {
    let { nw, k, method, max_iterations } = Object.assign({
        nw: 4,
        k: null,
        method: 'adapt',
        max_iterations: 100,
    }, options);

    // Default k (number of tapers)
    if(k === null) k = Math.floor(nw * 2 - 1);
    
    // Compute the DPSSs
    let sequences = dpss(signal.length, nw, k);
    let tapers = sequences.vectors;
    let eigenvalues = sequences.values;

    // Compute periodograms
    let psds = tapers.map(taper => periodogram(signal, sample_rate, {window: taper}));

    // Weighted average estimates
    let frequencies = psds[0].frequencies;
    let estimates;

    if(method == 'unity') {
        let weights = new Array(psds.length).fill(1);
        estimates = weightedTapers(psds, weights);
    } else if(method == 'eigen') {
        let weights = eigenvalues;
        estimates = weightedTapers(psds, weights);
    } else if(method == 'adapt') {
        // Calculate the initial estimate with first two tapers
        estimates = weightedTapers(psds.slice(0, 2), eigenvalues.slice(0, 2));

        // Calculate variance
        let variance = 0;
        for(let i = 0; i < signal.length; i++) variance += signal[i]**2;
        variance /= signal.length;

        // Iterate until convergence
        for(let i = 0; i < max_iterations; i++) {
            // Calculate weights
            let weights = calculateAdaptiveWeights(estimates, eigenvalues, variance);

            // Re-estimate the spectrum
            let new_estimates = weightedTapersFrequencies(psds, weights);

            // Check if converged
            let converged = true;
            for(let i = 0; i < estimates.length; i++) {
                let delta = Math.abs(estimates[i] - new_estimates[i]);
                if(delta > 1e-16) converged = false;
            }

            // Update spectrum
            estimates = new_estimates;

            // Complete if converged
            if(converged) break;
        }
    }

    return {
        estimates: estimates,
        frequencies: frequencies
    };
}
