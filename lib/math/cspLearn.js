const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/matrix'));

const numeric = require('numeric');
const stat = require('pw-stat');

/**
 * Learn common spatial pattern for two datasets
 * @memberof module:bcijs
 * @param {number[][]} class1 - Data samples for class 1. Rows should be samples, columns should be signals.
 * @param {number[][]} class2 - Data samples for class 2. Rows should be samples, columns should be signals.
 * @returns {Object} Learned CSP parameters
 */
function cspLearn(class1, class2) {
	var cov1 = stat.cov(class1);
	var cov2 = stat.cov(class2);
	var V = numeric.eig(math.multiply(math.inv(math.add(cov1, cov2)), cov1)).E.x;

	return {
		V: V
	}
}

module.exports = cspLearn;