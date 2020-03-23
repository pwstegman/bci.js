const periodogram = require('./periodogram.js');
const integrate = require('./integrate.js');

/**
 * Given a mixed array of strings and bands, ex: ['alpha', [4,10], 'beta']
 * Or simply a string, ex: 'alpha'
 * Or simple a band, ex: [4,10]
 * Reduce it to a common format of number[][].
 * Examples:
 * input => output
 * ['alpha', [4, 10], 'beta'] => [[8, 12], [4, 10], [13, 30]]
 * 'alpha' => [[8, 12]]
 * [4, 10] => [[4, 10]] 
 * @param {string|Array} bands 
 */
function reduceBands(bands) { 
    let bands = {
		// From Dan Szafir's "Pay Attention!", 2012
		'delta': [1, 3],
		'theta': [4, 7],
		'alpha': [8, 12],
		'beta': [13, 30],
		'gamma': [31, 50]
    };
    
    // If they pass only a string or only a single band
    // Example: 'alpha' or [4, 10]
    if(typeof bands === 'string' || typeof bands[0] === 'number') {
        bands = [bands];
    }

    // For each item in the array, replace a string with its matching band
    return bands.map(band => {
        if(typeof band === 'string') {
            let band_as_numbers = bands[band];
            if(band_as_numbers) return band_as_numbers;
            throw new Error('Invalid band type passed');
        }

        return band;
    });
}

/**
 * Calculate the bandpower of a signal in specified frequency bands
 * @param {number[]} signal 
 * @param {number} sample_rate 
 * @param {string|Array} bands 
 * @param {object} options 
 */
function bandpower(signal, sample_rate, bands, options) {
    // Start by calculating the PSD
    let psd = periodogram(signal, sample_rate);

    // Clean up 'bands' so it is a number[][] (array of bands where a band is [low, high])
    bands = reduceBands(bands);

    // Calculate area in each band
    let areas = new Array(bands.lenth);
    
    for(let i = 0; i < bands.length; i++) {
        // Get the proper section of the periodogram
        let band = bands[i];

        let low_index = Math.floor(band[0] / sample_rate * fft_size);
        let high_index = Math.min(Math.ceil(band[1] / sample_rate * fft_size), psd.estimates.length - 1);
        
        let psd_band = psd.estimates.slice(low_index, high_index + 1);

        if(psd_band.length < 2) {
            throw new Error('Unable to calculate power in specified bands. Please increase fftSize or sample length');
        }
        
        let dx = sample_rate / fft_size;

        areas[i] = integrate(psd_band, {rule: '3/8', dx: dx});
    }

    // If they only passed a single band (not an array of bands), then the array of areas will
    // have a length of 1. Return the single power value, not an array.
    if(typeof bands === 'string' || typeof bands[0] === 'number') {
        return areas[0];
    }

    return areas;
}

module.exports = bandpower;
