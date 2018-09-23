/**
 * Subscript an array with MATLAB-like syntax
 * @memberof module:bcijs
 * @param {Array} array - The array to be subscripted
 * @param {...string} params - Colon notation for which elements to include in each dimension
 * @returns {Array} The subscripted array
 * @example
 * var bci = require('bcijs');
 * var arr = [3, 2, 4, 1, 5];
 * var subarr = bci.subscript(arr, '1:3');
 * console.log(subarr); // [3, 2, 4]
 * @example
 * var bci = require('bcijs');
 * var arr = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ];
 * var subarr = bci.subscript(arr, '1 3', '2:3'); // rows 1 and 3, columns 2 through 3
 * console.log(subarr); // [[2, 3], [8, 9]]
 */
function subscript(array, ...params) {
	return recur(array, ...params);

	function recur(array, ...dims) {
		var arr = slice(array, dims.shift(), "matlab");

		if (dims.length != 0) {
			for (var i = 0; i < arr.length; i++) {
				arr[i] = recur(arr[i], ...dims);
			}
		}

		return arr;
	}

	function slice(array, dims, format = "python") {
		dims = dims.split(" ");

		var subs = [];

		dims.forEach(dim => {
			var cp = dim.indexOf(':');
			var indexes = dim.split(':');

			if (indexes.length > 2 || dim == '') {
				console.error("Invalid subscript string");
				return;
			}

			if (indexes[1] == '') {
				indexes[1] = array.length;
			}

			indexes = indexes.map(Number);

			if (format == "matlab" || format == "mat") {
				// TODO: Implement 'end' keyword
				// This format is still in beta
				if (indexes[0] > 0) {
					indexes[0] -= 1;
				}

				if (indexes[1] == -1) {
					indexes[1] = array.length;
				}

				if (indexes[1] < 0) {
					indexes[1] += 1;
				}
			}

			if (indexes.length == 1) {
				indexes.push(indexes[0] + 1);
			}

			subs.push(array.slice(...indexes));
		});

		return [].concat(...subs);
	}
}

module.exports = subscript;