"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accuracy = accuracy;

/**
 * Calculate the accuracy of a classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a confusion matrix
 * @returns {number} The accuracy
 */
function accuracy(confusionMatrix) {
  var correct = 0;

  for (var i = 0; i < confusionMatrix.length; i++) {
    correct += confusionMatrix[i][i];
  }

  var total = 0;

  for (var _i = 0; _i < confusionMatrix.length; _i++) {
    for (var j = 0; j < confusionMatrix.length; j++) {
      total += confusionMatrix[_i][j];
    }
  }

  return correct / total;
}