"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ldaLearn = ldaLearn;

var _mathjs = require("mathjs");

var _pwStat = _interopRequireDefault(require("pw-stat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Perform linear discriminant analysis between two datasets
 * @memberof module:bcijs
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
function ldaLearn(class1, class2) {
  var mu1 = (0, _mathjs.transpose)(_pwStat.default.mean(class1));
  var mu2 = (0, _mathjs.transpose)(_pwStat.default.mean(class2));
  var pooledCov = (0, _mathjs.add)(_pwStat.default.cov(class1), _pwStat.default.cov(class2));
  var theta = (0, _mathjs.multiply)((0, _mathjs.inv)(pooledCov), (0, _mathjs.subtract)(mu2, mu1));
  var b = (0, _mathjs.multiply)(-1, (0, _mathjs.transpose)(theta), (0, _mathjs.add)(mu1, mu2), 1 / 2);
  return {
    theta: theta,
    b: b
  };
}