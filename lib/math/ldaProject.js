const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/arithmetic'));

/**
 * Predict the class of an unknown data point.
 * @memberof module:bcijs
 * @param {object} ldaParams - The parameters for the LDA, computed with the function ldaLearn
 * @param {number[]} point - The data point to be classified.
 * @returns {number} value less than 0 if predicted to be in class 1, 0 if exactly inbetween, greater than 0 if class 2
 */
function ldaProject(ldaParams, point) {
	return math.add(math.multiply(point, ldaParams.theta), ldaParams.b);
}

module.exports = ldaProject;
