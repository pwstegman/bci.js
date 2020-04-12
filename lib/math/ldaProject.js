"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ldaProject = ldaProject;

var _mathjs = require("mathjs");

/**
 * Predict the class of an unknown data point.
 * @memberof module:bcijs
 * @param {object} ldaParams - The parameters for the LDA, computed with the function ldaLearn
 * @param {number[]|number[][]} point - The data point or array of points to be projected.
 * @returns {number} value less than 0 if predicted to be in class 1, 0 if exactly inbetween, greater than 0 if class 2
 */
function ldaProject(ldaParams, point) {
  return (0, _mathjs.add)((0, _mathjs.multiply)(point, ldaParams.theta), ldaParams.b);
}