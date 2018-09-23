/**
 * Similar to JavaScript's map, but it applies a function to sub arrays instead of each element.
 * Each sub array, or window, starts at index 0 and has length 'length'
 * Each next window will be shifted 'step' elements from the first. The result of each function is stored in a returned array.
 * @memberof module:bcijs
 * @param {Array} array - The array of elements which will be windowed
 * @param {Function} func - The function to call on each window, the returned result is stored in a returned array
 * @param {number} length - The number of elements to include in each window
 * @param {number} step - The start of the window is incremented by this amount every iteration
 * @param {boolean} tail - If false, windows which begin near the end of the array which cannot reach length 'length' will be ignored
 * @returns {Array} An array containing the function result for each window
 * @example
 * var bci = require('bcijs');
 * bci.windowApply([1, 2, 3, 4, 5], window => console.log(window), 3, 1);
 * // [1, 2, 3]
 * // [2, 3, 4]
 * // [3, 4, 5] 
 * @example
 * var bci = require('bcijs');
 * var sums = bci.windowApply([1, 2, 3, 4, 5], window => {
 *   var sum = 0;
 *   window.forEach(x => sum += x);
 *   return sum;
 * }, 3, 1);
 * console.log(sums);
 * // [6, 9, 12]
 */
function windowApply(array, func, length, step = -1, tail = false) {
	if (step == -1) step = length;

	var result = [];

	for (var i = 0; i < array.length; i += step) {
		var window = array.slice(i, i + length);
		if (tail || window.length == length) {
			result.push(func(window));
		}
	}

	return result;
}

module.exports = windowApply;