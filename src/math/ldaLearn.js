import { transpose, add, multiply, inv, subtract } from 'mathjs';
import stat from 'pw-stat';

/**
 * Perform linear discriminant analysis between two datasets
 * @memberof module:bcijs
 * @function
 * @name ldaLearn
 * @param {number[][]} class1 - Data set for class 1, rows are samples, columns are variables
 * @param {number[][]} class2 - Data set for class 2, rows are samples, columns are variables
 * @returns {Object} Computed LDA parameters
 * @example
 * // Training set
 * let class1 = [[0, 0], [1, 2], [2, 2], [1.5, 0.5]];
 * let class2 = [[8, 8], [9, 10], [7, 8], [9, 9]];
 * 
 * // Learn an LDA classifier
 * let ldaParams = bci.ldaLearn(class1, class2);
 */
export function ldaLearn(class1, class2) {
	var mu1 = transpose(stat.mean(class1));
	var mu2 = transpose(stat.mean(class2));
	var pooledCov = add(stat.cov(class1), stat.cov(class2));
	var theta = multiply(inv(pooledCov), subtract(mu2, mu1));
	var b = multiply(-1, transpose(theta), add(mu1, mu2), 1 / 2);

	return {
		theta: theta,
		b: b
	};
}
