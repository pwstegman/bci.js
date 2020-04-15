import { multiply, inv, add } from 'mathjs';
import numeric from 'numeric';
import stat from 'pw-stat';

/**
 * Creates a new CSP object
 * @name CSP
 * @memberof module:bcijs.signal
 * @constructor
 * @param {number[][]} class1 - Data samples for class 1. Rows should be samples, columns should be signals.
 * @param {number[][]} class2 - Data samples for class 2. Rows should be samples, columns should be signals.
 */
export function CSP(class1, class2) {
	var cov1 = stat.cov(class1);
	var cov2 = stat.cov(class2);
	this.V = numeric.eig(multiply(inv(add(cov1, cov2)), cov1)).E.x;
}

/**
 * Projects data and reduces to given number of dimensions
 * @name project
 * @memberof module:bcijs.signal.CSP
 * @function
 * @param {number[][]} data - Data points to be projected. Rows should be samples, columns should be signals.
 * @param {number} [dimensions] - Number of dimensions to be returned. Can range from 1 to number of signals. Defaults to number of signals.
 * @returns {number[][]} Projected data. Rows are samples, columns are dimensions sorted by descending importance.
 */
CSP.prototype.project = function (data, dimensions) {
	var projected = multiply(data, this.V);

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

export { CSP as csp };
