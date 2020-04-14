"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dpss = dpss;

var _mathjs = require("mathjs");

var _fft = _interopRequireDefault(require("fft.js"));

var _nextpow = require("./nextpow2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * Compute q, which is used in computing the eigenvalues
 * @param {number[]} E - Eigenvector
 * @returns {number[]} q for the given eigenvector
 */


function computeQ(E) {
  // Copy E into A and store its reverse into B
  var A = new Array(E.length);
  var B = new Array(E.length);

  for (var i = 0; i < E.length; i++) {
    A[i] = E[E.length - i - 1];
    B[i] = E[i];
  } // Length of eigenvector


  var N = E.length; // We'll use an FFT to compute the convolution

  var fft_len = Math.pow(2, (0, _nextpow.nextpow2)(E.length + N - 1)); // Pad with zeros to allow for linear convolution via FFT

  for (var _i = 0; _i < fft_len - N; _i++) {
    A.push(0);
    B.push(0);
  } // FFT object


  var f = new _fft.default(fft_len); // FFT A

  var out1 = f.createComplexArray();
  f.realTransform(out1, A);
  f.completeSpectrum(out1); // FFT B

  var out2 = f.createComplexArray();
  f.realTransform(out2, B);
  f.completeSpectrum(out2); // Multiply the complex arrays FFT A and FFT B

  var mult = [];

  for (var _i2 = 0; _i2 < out1.length; _i2 += 2) {
    var a = out1[_i2];
    var b = out1[_i2 + 1];
    var c = out2[_i2];
    var d = out2[_i2 + 1];
    var c1 = a * c - b * d;
    var c2 = a * d + b * c;
    mult.push(c1);
    mult.push(c2);
  } // Compute the inverse FFT of the product


  var conv_complex = f.createComplexArray();
  f.inverseTransform(conv_complex, mult); // Grab the real components up to the length of the eigenvector
  // (imaginary components are zero)

  var conv = [];

  for (var _i3 = 0; _i3 < N * 2; _i3 += 2) {
    conv.push(conv_complex[_i3]);
  } // Return the result


  return conv;
} // For caching the DPSSs


var dpss_cache = {};
/**
 * Compute the discrete prolate spheroidal (Slepian) sequences
 * 
 * For lengths greater than 128, DPSSs of length 128 are calculated and then
 * linearly interpolated up to the desired length.
 * 
 * Once the underlying eigenvector method is optimized further, we may be able to increase the
 * length prior to interpolation.
 * 
 * Reference: D. B. Percival and A. T. Walden, "Calculation of Discrete Prolate Spheroidal Sequences," in Spectral Analysis for Physical Applications, pp. 378–390, 1993.
 * 
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

  var W = NW / N; // Eigenvectors and eigenvalues

  var vectors;
  var all_values;

  if (!dpss_cache[[N, NW]]) {
    // Form tridiag matrix
    var diag = [];

    for (var t = 0; t < N; t++) {
      var value = Math.pow((N - 1 - 2 * t) / 2, 2) * Math.cos(2 * Math.PI * W);
      diag.push(value);
    }

    var offdiag = [];

    for (var _t = 1; _t < N; _t++) {
      offdiag.push(_t * (N - _t) / 2);
    } // Compute eigenvectors (sorted by increasing eigenvalue)


    var eigen = (0, _mathjs.eigs)(tridiag(diag, offdiag));
    vectors = (0, _mathjs.transpose)(eigen.vectors); // Compute eigenvalues of the definition equation

    var s = new Array(N);
    s[N - 1] = [2 * W];

    var sinc = function sinc(x) {
      return Math.sin(Math.PI * x) / (Math.PI * x);
    };

    for (var i = 1; i < N; i++) {
      s[N - i - 1] = [4 * W * sinc(2 * W * i)];
    }

    var q = vectors.map(function (vector) {
      return computeQ(vector);
    });
    all_values = (0, _mathjs.multiply)(q, s); // Save cache

    dpss_cache[[N, NW]] = {
      vectors: vectors,
      values: all_values
    };
  } else {
    var cached = dpss_cache[[N, NW]];
    vectors = cached.vectors;
    all_values = cached.values;
  } // Select only top K eigenvalues of definition equation
  // Ensure values are between 0 and 1. (It's possible to get values
  // slightly below 0 or above 1 due to finite precision errors.


  var values = [];
  var num_values = K;
  if (arguments[3]) num_values = all_values.length;

  for (var _i4 = 0; _i4 < num_values; _i4++) {
    var val = all_values[N - _i4 - 1][0];
    if (val < 0) val = 0;else if (val > 1) val = 1;
    values.push(val);
  } // Select eigenvectors with K largest eigenvalues


  vectors = vectors.slice(vectors.length - K); // Flip vectors so they always start greater than 0

  /*
  Formally the expected behavior is they should be positive when symmetric (K is even) or
  begin with a "positive first lobe" when not (K is odd) (Percival and Walden, 1993, p. 379)
  */

  for (var r = 0; r < vectors.length; r++) {
    if (vectors[r][0] < 0) {
      for (var c = 0; c < vectors[r].length; c++) {
        vectors[r][c] *= -1;
      }
    }
  } // Reverse array of vectors


  vectors = vectors.reverse(); // Interpolate up as needed

  if (length > N) {
    // Interpolate linearly
    vectors = vectors.map(function (taper) {
      return interpolate(taper, length);
    }); // Rescale to have proper area under curve

    for (var _t2 = 0; _t2 < vectors.length; _t2++) {
      var scale = 0;

      for (var _i5 = 0; _i5 < vectors[_t2].length; _i5++) {
        scale += Math.pow(vectors[_t2][_i5], 2);
      }

      scale = Math.sqrt(scale);

      for (var _i6 = 0; _i6 < vectors[_t2].length; _i6++) {
        vectors[_t2][_i6] /= scale;
      }
    }
  }

  return {
    vectors: vectors,
    values: values
  };
}