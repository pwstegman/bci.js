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
    let { nw } = Object.assign({
        nw: 4
    }, options);
    
    // Compute the DPSSs
    let tapers = dpss(signal.length, nw);

    // Compute periodograms
    let psds = tapers.map(taper => periodogram(signal, sample_rate, {window: taper}));

    // Average estimates
    let avg = new Array(psds[0].estimates.length).fill(0);
    for(let p = 0; p < psds.length; p++) {
        for(let i = 0; i < psds[p].estimates.length; i++) {
            avg[i] += psds[p].estimates[i];
        }
    }
    for(let i = 0; i < avg.length; i++) {
        avg[i] /= psds.length;
    }

    // Return PSD
    return {
        estimates: avg,
        frequencies: psds[0].frequencies
    }
}
