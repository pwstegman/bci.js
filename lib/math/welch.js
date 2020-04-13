const periodogram = require('./periodogram.js');
const windowApply = require('../data/windowApply.js');
const nextpow2 = require('./nextpow2.js');

function welch(signal, sample_rate, options) {
    let { segmentLength, overlapLength, fftSize } = Object.assign({
        segmentLength: 256,
        overlapLength: null,
        fftSize: null
    }, options);

    if(overlapLength === null) overlapLength = Math.floor(segmentLength / 2);
    if(fftSize === null) fftSize = 2**nextpow2(segmentLength);
    
    let step = segmentLength - overlapLength;

    if(step <= 0) throw new Error('Invalid overlap, must be less than segmentLength');

    let PSDs = windowApply(signal, epoch => {
        return periodogram(epoch, sample_rate, {fftSize: fftSize, window: 'hann'});
    }, segmentLength, step, false);

    if(PSDs.length == 0) throw new Error('Unable to calculate any PSD estimates');
    if(PSDs.length == 1) {
        console.warn('Not enough data to compute more than one segment, returning single modified periodogram.');
        return PSDs[0];
    }

    // Compute average PSD
    let num_estimates = PSDs[0].estimates.length;
    let avg = new Array(num_estimates).fill(0);
    for(let p = 0; p < PSDs.length; p++) {
        for(let i = 0; i < num_estimates; i++) {
            avg[i] += PSDs[p].estimates[i];
        }
    }
    for(let i = 0; i < num_estimates; i++) {
        avg[i] = avg[i] / PSDs.length;
    }

    return {
        estimates: avg,
        frequencies: PSDs[0].frequencies
    };
}

module.exports = welch;
