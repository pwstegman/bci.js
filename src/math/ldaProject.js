import { add, multiply } from 'mathjs';

/**
 * Predict the class of an unknown data point.
 * @memberof module:bcijs
 * @function
 * @name ldaProject
 * @param {object} ldaParams - The parameters for the LDA, computed with the function ldaLearn
 * @param {number[]|number[][]} point - The data point or array of points to be projected.
 * @returns {number} value less than 0 if predicted to be in class 1, 0 if exactly inbetween, greater than 0 if class 2
 */
export function ldaProject(ldaParams, point) {
	return add(multiply(point, ldaParams.theta), ldaParams.b);
}
