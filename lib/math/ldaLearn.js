const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/matrix'));

var stat = require('pw-stat');

/**
 * Perform linear discriminant analysis between two datasets
 * @memberof module:bcijs
 * @param {number[][]} class1 - Data set for class 1, rows are samples, columns are variables
 * @param {number[][]} class2 - Data set for class 2, rows are samples, columns are variables
 * @returns {Object} Computed LDA parameters
 */
function ldaLearn(class1, class2) {
	var mu1 = math.transpose(stat.mean(class1));
	var mu2 = math.transpose(stat.mean(class2));
	var pooledCov = math.add(stat.cov(class1), stat.cov(class2));
	var theta = math.multiply(math.inv(pooledCov), math.subtract(mu2, mu1));
	var b = math.multiply(-1, math.transpose(theta), math.add(mu1, mu2), 1 / 2);

	return {
		theta: theta,
		b: b
	};
}

module.exports = ldaLearn;