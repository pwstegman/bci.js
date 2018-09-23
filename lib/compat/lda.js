var pwlda = require('pw-lda');

/**
 * An LDA object
 * @deprecated since version 1.1
 * @name LDA
 * @memberof module:bcijs
 * @constructor
 * @param {number[][]} class1 - Data set for class 1, rows are samples, columns are variables
 * @param {number[][]} class2 - Data set for class 2, rows are samples, columns are variables
 */

/**
 * Predict the class of an unknown data point
 * @name project
 * @memberof module:bcijs.LDA
 * @function
 * @param {number[]} point - The data point to be classified.
 * @returns {number} value less than 0 if predicted to be in class 1, 0 if exactly inbetween, greater than 0 if class 2
 */

module.exports = pwlda;
