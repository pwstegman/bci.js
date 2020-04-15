"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cspLearn = cspLearn;

var _mathjs = require("mathjs");

var _numeric = _interopRequireDefault(require("numeric"));

var _pwStat = _interopRequireDefault(require("pw-stat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function cspLearn(class1, class2) {
  var cov1 = _pwStat.default.cov(class1);

  var cov2 = _pwStat.default.cov(class2);

  var V = _numeric.default.eig((0, _mathjs.multiply)((0, _mathjs.inv)((0, _mathjs.add)(cov1, cov2)), cov1)).E.x;

  return {
    V: V
  };
}