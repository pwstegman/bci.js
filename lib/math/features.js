/** 
 * Feature extraction methods
 * @namespace features
 * @memberof module:webbci
 */

var math = require('mathjs');
var sbp = require('./signalBandPower.js');

/**
 * Computes the log of the variance of each channel in a 2d array of samples, where channels are columns
 * @memberof module:webbci.features
 * @param {number[][]} window 
 */
module.exports.logvar = window => {
	return math.transpose(window).map(channel => math.log(math.var(channel)));
}

/**
 * Computes the root mean square of each channel in a 2d array of samples, where channels are columns
 * @memberof module:webbci.features
 * @param {number[][]} window 
 */
module.exports.rms = window => {
	return math.transpose(window).map(channel => math.sqrt(math.mean(math.square(channel))));
}

/* TODO: Add features with bands */