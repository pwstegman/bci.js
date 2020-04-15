"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.balancedAccuracy = balancedAccuracy;

var _recall = require("./recall");

var _specificity = require("./specificity");

/**
 * Calculate the balanced accuracy of a classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a confusion matrix
 * @returns {number} The balanced accuracy
 */
function balancedAccuracy(confusionMatrix) {
  var tpr = (0, _recall.recall)(confusionMatrix);
  var tnr = (0, _specificity.specificity)(confusionMatrix);
  return (tpr + tnr) / 2;
}