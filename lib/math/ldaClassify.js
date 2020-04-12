"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ldaClassify = ldaClassify;

var _ldaProject = require("./ldaProject");

/**
 * Classify an unknown data point.
 * @memberof module:bcijs
 * @param {object} ldaParams - The parameters for the LDA, computed with the function ldaLearn
 * @param {number[]|number[][]} point - The data point or array of points to be classified.
 * @returns {number} 0 if the first class, 1 if the second class
 * @example
 * let features = [[1,3], [5,2]]; // Example feature vectors
 * let classification = bci.ldaClassify(ldaParams, features[0]); // Outputs a number (0 or 1 depending on class)
 * let classifications = bci.ldaClassify(ldaParams, features); // Outputs an array of classifications
 */
function ldaClassify(ldaParams, point) {
  var result = (0, _ldaProject.ldaProject)(ldaParams, point);

  if (Array.isArray(result)) {
    for (var i = 0; i < result.length; i++) {
      result[i] = result[i] < 0 ? 0 : 1;
    }
  } else {
    result = result < 0 ? 0 : 1;
  }

  return result;
}