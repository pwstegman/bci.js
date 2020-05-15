import { multiply } from 'mathjs';

/**
 * Projects data using common spatial pattern (CSP) and reduces to given number of dimensions.
 * Check out {@link https://bci.js.org/examples/csp/} for an interactive example of how CSP works.
 * @memberof module:bcijs
 * @function
 * @name cspProject
 * @param {object} cspParams - CSP parameters computed using the cspLearn function
 * @param {number[][]} data - Data points to be projected. Rows should be samples, columns should be signals.
 * @param {number} [dimensions] - Number of dimensions to be returned. Can range from 1 to number of signals. Defaults to number of signals.
 * @returns {number[][]} Projected data. Rows are samples, columns are dimensions sorted by descending importance.
 * @example
 * // Learn the CSP params
 * let cspParams = bci.cspLearn(class_a, class_b);
 * 
 * // Project the signals
 * let class_a_csp = bci.cspProject(cspParams, class_a);
 * let class_b_csp = bci.cspProject(cspParams, class_b);
 */
export function cspProject(cspParams, data, dimensions) {
	var projected = multiply(data, cspParams.V);

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
