"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transpose = transpose;

/**
 * Transpose an array
 * @memberof module:bcijs
 * @param {Array} array - The array to transpose
 * @returns {Array} The transposed array
 */
function transpose(array) {
  var rows = array.length;
  var cols = array[0].length; // Verify array dimensions

  for (var i = 0; i < rows; i++) {
    if (array[i].length != cols) {
      throw new Error('Array dimension error: must be 2d array with equal row lengths');
    }
  } // Create new array


  var transposed = new Array(cols);

  for (var c = 0; c < cols; c++) {
    transposed[c] = new Array(rows);

    for (var r = 0; r < rows; r++) {
      transposed[c][r] = array[r][c];
    }
  }

  return transposed;
}