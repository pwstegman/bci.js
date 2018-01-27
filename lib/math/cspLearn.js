var numeric = require('numeric');
var math = require('mathjs');
var stat = require('pw-stat');

/**
 * Learn common spatial pattern for two datasets
 * @param {number[][] | webbci.ds.Matrix} class1 - Data samples for class 1. Rows should be samples, columns should be signals.
 * @param {number[][] | webbci.ds.Matrix} class2 - Data samples for class 2. Rows should be samples, columns should be signals.
 * @returns Learned CSP parameters
 */
function cspLearn(class1, class2) {
	if (class1.constructor.name === 'Matrix') class1 = class1.array;
	if (class2.constructor.name === 'Matrix') class2 = class2.array;

	var cov1 = stat.cov(class1);
	var cov2 = stat.cov(class2);
	var V = numeric.eig(math.multiply(math.inv(math.add(cov1, cov2)), cov1)).E.x;

	return {
		V: V
	}
}

module.exports = cspLearn;