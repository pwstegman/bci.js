const transpose = require('./transpose.js');
const signalBandPower = require('./signalBandPower.js');

/**
 * Computes the power in each frequency band averaged across all channels
 * @memberof module:bcijs
 * @param {number[][]} samples - The signals where rows are samples and columns are electrodes
 * @param {number} sampleRate - Sample rate of the data
 * @param {Array} bands - An array of frequency bands. See signalBandPower for more info on frequency bands.
 * @param {number} [fftSize] - The size of the fft to use. See signalBandPower for more info on fft sizes.
 * @example
 * let feature = bci.averageBandPowers(samples, 256, ['alpha', 'beta']);
 * // returns [alpha_power_averaged_across_channels, beta_power_averaged_across_channels]
 */
function averageBandPowers(samples, sampleRate, bands, fftSize = null){
	let powers = new Array(bands.length);
	for(let i = 0; i < bands.length; i++){
		powers[i] = 0;
    }
    
    let channels = transpose(samples);
	for(let i = 0; i < channels.length; i++){
		for(let j = 0; j < bands.length; j++){
            let bandPower = signalBandPower(channels[i], sampleRate, bands[j], fftSize);
            powers[j] += bandPower;
        }
    }
    
    for(let i = 0; i < bands.length; i++){
        powers[i] = powers[i] / channels.length;
    }
	return powers;
}
module.exports = averageBandPowers;
