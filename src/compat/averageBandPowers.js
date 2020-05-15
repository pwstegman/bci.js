import { transpose } from '../math/transpose';
import { signalBandPower }  from './signalBandPower';

/**
 * Deprecated, please use bci.bandpower() for output in proper units.
 * 
 * The functionality of this method has been replaced with the 'bandpower' method.
 * See the docs for 'bandpower' for more information.
 * 
 * Computes the average magnitude across each frequency band averaged across all channels
 * Use bci.bandpower() for band power in proper units (signal units squared).
 * 
 * @deprecated Deprecated since version 1.7.0, will be removed in version 2.0.0
 * 
 * @memberof module:bcijs
 * @param {number[][]} samples - The signals where rows are samples and columns are electrodes
 * @param {number} sampleRate - Sample rate of the data
 * @param {Array} bands - An array of frequency bands. See signalBandPower for more info on frequency bands.
 * @param {number} [fftSize] - The size of the fft to use. See signalBandPower for more info on fft sizes.
 * @returns {number[]} Array containing the average power across all channels in each band
 * @example
 * let feature = bci.averageBandPowers(samples, 256, ['alpha', 'beta']);
 * // returns [alpha_power_averaged_across_channels, beta_power_averaged_across_channels]
 */
export function averageBandPowers(samples, sampleRate, bands, fftSize = null){
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
