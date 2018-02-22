/**
 * Subscript an array with MATLAB-like syntax
 * @memberof module:webbci
 * @param {Array} array - The array to be subscripted
 * @param {...string} params - Colon notation for which elements to include in each dimension
 * @returns {Array} The subscripted array
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