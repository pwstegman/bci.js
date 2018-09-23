const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/arithmetic'));

/**
 * Projects data and reduces to given number of dimensions
 * @memberof module:bcijs
 * @param {object} cspParams - CSP parameters computed using the cspLearn function
 * @param {number[][]} data - Data points to be projected. Rows should be samples, columns should be signals.
 * @param {number} [dimensions] - Number of dimensions to be returned. Can range from 1 to number of signals. Defaults to number of signals.
 * @returns {number[][]} Projected data. Rows are samples, columns are dimensions sorted by descending importance.
 */
function cspProject(cspParams, data, dimensions) {
	var projected = math.multiply(data, cspParams.V);

	// Default number of dimensions is all of them, which is number of columns in data
	dimensions = typeof dimensions !== "undefined" ? dimensions : projected[0].length;

	var reduced = [];

	for (var r = 0; r < projected.length; r++) {
		reduced.push([]);

		for (var i = 0; i < dimensions; i++) {
			// Start at left and right ends of matrix columns are work towards center
			if (i % 2 == 0) {
				var column = i / 2;
			} else {
				var column = projected[0].length - (i + 1) / 2;
			}
			reduced[r].push(projected[r][column]);
		}
	}

	return reduced;
}

module.exports = cspProject;