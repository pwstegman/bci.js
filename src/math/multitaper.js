import { dpss } from './dpss';
import { periodogram } from './periodogram';

/**
 * Apply a taper to a signal
 * @private
 * @param {number[]} signal - The signal
 * @param {number[]} taper - The taper
 * @returns {numbr[]} - The tapered signal
 */
function applyTaper(signal, taper) {
    if(signal.length != taper.length) throw new Error('Signal and taper must have same length');
    let tapered = [];
    for(let i = 0; i < taper.length; i++) {
        tapered.push(taper[i] * signal[i]);
    }
    return tapered;
}

export function multitaper(signal, sample_rate) {
    // Compute the DPSSs
    let tapers = dpss(signal.length);

    // Apply tapers to signal
    let tapered_signals = tapers.map(taper => applyTaper(signal, taper));

    // Compute periodograms
    let psds = tapered_signals.map(tapered => periodogram(tapered, sample_rate));

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
