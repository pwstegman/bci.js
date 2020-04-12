"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dpss = dpss;

var _mathjs = require("mathjs");

/**
 * Compute a symmetric tridiagonal matrix given diagonal and off-diagonal elements
 * @private
 * @param {number[]} diag - The diagonal elements
 * @param {number[]} offdiag - The off-diagonal elements
 * @returns {number[][]} The tridiagonal matrix
 */
function tridiag(diag, offdiag) {
  if (diag.length != offdiag.length + 1) {
    throw new Error('Invalid diag and offdiag lengths');
  }

  var M = [];

  for (var r = 0; r < diag.length; r++) {
    var row = [];

    for (var c = 0; c < diag.length; c++) {
      var value = 0; // Diag

      if (r == c) {
        value = diag[r];
      } // Offdiag
      else if (r + 1 == c) {
          value = offdiag[r];
        } else if (c + 1 == r) {
          value = offdiag[c];
        }

      row.push(value);
    }

    M.push(row);
  }

  return M;
}
/**
 * Linearly interpolate array of values to target length
 * @private
 * @param {number[]} arr - Input array
 * @param {number} N - Target length 
 * @returns {number[]} - Interpolated array
 */


function interpolate(arr, N) {
  var interp = [];

  for (var i = 0; i < N; i++) {
    // Find matching index in original array
    var matching_index = i / (N - 1) * (arr.length - 1); // See how offset we are from an integer index

    var offset = matching_index % 1; // If it's a clean integer, use it

    if (offset === 0) {
      interp.push(arr[matching_index]);
    } // If not, interpolate linearly
    else {
        var low = Math.floor(matching_index);
        var high = Math.ceil(matching_index);
        interp.push(arr[low] * (1 - offset) + arr[high] * offset);
      }
  }

  return interp;
}
/**
 * Compute the discrete prolate spheroidal (Slepian) sequences
 * 
 * This method is quite slow for N > 128. If you need DPSSs of length > 128,
 * it may be best to calculate DPSSs of length 128 and then interpolate.
 * 
 * Reference: D. B. Percival and A. T. Walden, "Calculation of Discrete Prolate Spheroidal Sequences," in Spectral Analysis for Physical Applications, pp. 378–390, 1993.
 * @param {number} length - Length of sequences 
 * @param {number} [NW=4] - Time-half-handwidth (Default 4)
 * @param {number} [K=floor(2*NW-1)] - Number of sequences to return (Default 7)
 */


function dpss(length) {
  var NW = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var K = arguments.length > 2 ? arguments[2] : undefined;
  if (typeof K === "undefined") K = Math.floor(2 * NW - 1);
  if (K < 1 || K > N) throw new Error('Invalid value for K'); // As eig method is very slow, cap at 128 and interpolate up

  var N = Math.min(length, 128); // Calculate half bandwidth

  var W = NW / N; // Form tridiag matrix

  var diag = [];

  for (var t = 0; t < N; t++) {
    var value = Math.pow((N - 1 - 2 * t) / 2, 2) * Math.cos(2 * Math.PI * W);
    diag.push(value);
  }

  var offdiag = [];

  for (var _t = 1; _t < N; _t++) {
    offdiag.push(_t * (N - _t) / 2);
  } // Compute eigenvectors (sorted by increasing eigenvalue)


  var _eigs = (0, _mathjs.eigs)(tridiag(diag, offdiag)),
      vectors = _eigs.vectors;

  vectors = (0, _mathjs.transpose)(vectors); // Select eigenvectors with K largest eigenvalues

  var result = vectors.slice(vectors.length - K); // Flip vectors so they always start greater than 0

  /*
  Formally the expected behavior is they should be positive when symmetric (K is even) or
  begin with a "positive first lobe" when not (K is odd) (Percival and Walden, 1993, p. 379)
  */

  for (var r = 0; r < result.length; r++) {
    if (result[r][0] < 0) {
      for (var c = 0; c < result[r].length; c++) {
        result[r][c] *= -1;
      }
    }
  } // Reverse array of vectors


  result = result.reverse(); // Interpolate up as needed

  if (length > N) {
    // Interpolate linearly
    result = result.map(function (taper) {
      return interpolate(taper, length);
    }); // Rescale to have proper area under curve

    for (var _t2 = 0; _t2 < result.length; _t2++) {
      var scale = 0;

      for (var i = 0; i < result[_t2].length; i++) {
        scale += Math.pow(result[_t2][i], 2);
      }

      scale = Math.sqrt(scale);

      for (var _i = 0; _i < result[_t2].length; _i++) {
        result[_t2][_i] /= scale;
      }
    }
  }

  return result;
}