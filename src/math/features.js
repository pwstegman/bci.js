import { log, variance, sqrt, mean, square } from 'mathjs';
import { transpose } from './transpose';

/** 
 * Feature extraction methods
 * @namespace features
 * @memberof module:bcijs
 */

export let features = {};

/**
 * Computes the log of the variance along the specified dimension
 * @memberof module:bcijs.features
 * @function
 * @name logvar
 * @param {number[] | number[][]} window - The data
 * @param {string} [dimension] - If 'rows' or 'columns' passed, the features are calculated along that dimension
 */
features.logvar = function(window, dimension = null) {
	if(dimension == null){
		return log(variance(window));
	}

	var possibleDimensions = ['rows', 'cols', 'columns'];
	if(possibleDimensions.indexOf(dimension) == -1){
		throw "Invalid dimension";
	}

	if(dimension == 'cols' || dimension == 'columns'){
		window = transpose(window);
	}

	return window.map(channel => log(variance(channel)));
}

/**
 * Computes the variance along the specified dimension
 * @memberof module:bcijs.features
 * @function
 * @name variance
 * @param {number[] | number[][]} window - The data
 * @param {string} [dimension] - If 'rows' or 'columns' passed, the features are calculated along that dimension
 */
features.variance = function(window, dimension = null) {
	if(dimension == null){
		return log(variance(window));
	}

	var possibleDimensions = ['rows', 'cols', 'columns'];
	if(possibleDimensions.indexOf(dimension) == -1){
		throw "Invalid dimension";
	}

	if(dimension == 'cols' || dimension == 'columns'){
		window = transpose(window);
	}

	return window.map(channel => variance(channel));
}

/**
 * Computes the root mean square along the specified dimension
 * @memberof module:bcijs.features
 * @function
 * @name rootMeanSquare
 * @param {number[] | number[][]} window - The data
 * @param {string} [dimension] - If 'rows' or 'columns' passed, the features are calculated along that dimension
 */
features.rootMeanSquare = function(window, dimension = null) {
	if(dimension == null){
		return sqrt(mean(square(window)));
	}

	var possibleDimensions = ['rows', 'cols', 'columns'];
	if(possibleDimensions.indexOf(dimension) == -1){
		throw "Invalid dimension";
	}

	if(dimension == 'cols' || dimension == 'columns'){
		window = transpose(window);
	}

	return window.map(channel => sqrt(mean(square(channel))));
}
