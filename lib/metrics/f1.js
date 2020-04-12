"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.f1 = f1;

var _precision = require("./precision");

var _recall = require("./recall");

/**
 * Calculate the f1 score of a binary classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a 2x2 confusion matrix
 * @returns {number} The f1 score
 */
function f1(confusionMatrix) {
  if (confusionMatrix.length != 2 || confusionMatrix[0].length != 2 || confusionMatrix[1].length != 2) {
    throw new Error('Confusion matrix must be of size 2x2');
  }

  var p = (0, _precision.precision)(confusionMatrix);
  var r = (0, _recall.recall)(confusionMatrix);
  var f1 = 2 * p * r / (p + r);
  return f1;
}