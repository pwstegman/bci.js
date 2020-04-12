"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mcc = mcc;

/**
 * Calculate the Matthews correlation coefficient (MCC) of a binary classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a 2x2 confusion matrix
 * @returns {number} The Matthews correlation coefficient
 */
function mcc(confusionMatrix) {
  if (confusionMatrix.length != 2 || confusionMatrix[0].length != 2 || confusionMatrix[1].length != 2) {
    throw new Error('Confusion matrix must be of size 2x2');
  }

  var TN = confusionMatrix[0][0];
  var FP = confusionMatrix[0][1];
  var FN = confusionMatrix[1][0];
  var TP = confusionMatrix[1][1];
  return (TP * TN - FP * FN) / Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
}