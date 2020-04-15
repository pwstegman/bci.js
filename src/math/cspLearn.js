import { multiply, inv, add } from 'mathjs';
import numeric from 'numeric';
import stat from 'pw-stat';

/**
 * Learn common spatial pattern (CSP) for two datasets.
 * Check out {@link https://bci.js.org/examples/csp/} for an interactive example of how CSP works.
 * @memberof module:bcijs
 * @param {number[][]} class1 - Data samples for class 1. Rows should be samples, columns should be signals.
 * @param {number[][]} class2 - Data samples for class 2. Rows should be samples, columns should be signals.
 * @returns {Object} Learned CSP parameters
 * @example
 * let cspParams = bci.cspLearn(class_a, class_b);
 */
export function cspLearn(class1, class2) {
	var cov1 = stat.cov(class1);
	var cov2 = stat.cov(class2);
	var V = numeric.eig(multiply(inv(add(cov1, cov2)), cov1)).E.x;

	return {
		V: V
	}
}
