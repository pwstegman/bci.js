/** 
 * Feature extraction methods
 * @namespace features
 * @memberof module:bcijs
 */

const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/matrix'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/statistics'));

var sbp = require('./signalBandPower.js');

/**
 * Computes the log of the variance along the specified dimension
 * @memberof module:bcijs.features
 * @param {number[] | number[][]} window - The data
 * @param {string} [dimension] - If 'rows' or 'columns' passed, the features are calculated along that dimension
 */
function logvar(window, dimension = null) {
	if(dimension == null){
		return math.log(math.var(window));
	}

	var possibleDimensions = ['rows', 'cols', 'columns'];
	if(possibleDimensions.indexOf(dimension) == -1){
		throw "Invalid dimension";
	}

	if(dimension == 'cols' || dimension == 'columns'){
		window = math.transpose(window);
	}

	return window.map(channel => math.log(math.var(channel)));
}
module.exports.logvar = logvar;

/**
 * Computes the root mean square along the specified dimension
 * @memberof module:bcijs.features
 * @param {number[] | number[][]} window - The data
 * @param {string} [dimension] - If 'rows' or 'columns' passed, the features are calculated along that dimension
 */
function rootMeanSquare(window, dimension = null) {
	if(dimension == null){
		return math.sqrt(math.mean(math.square(window)));
	}

	var possibleDimensions = ['rows', 'cols', 'columns'];
	if(possibleDimensions.indexOf(dimension) == -1){
		throw "Invalid dimension";
	}

	if(dimension == 'cols' || dimension == 'columns'){
		window = math.transpose(window);
	}

	return window.map(channel => math.sqrt(math.mean(math.square(channel))));
}
module.exports.rootMeanSquare = rootMeanSquare;

/* TODO: Add features with bands */