"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastICA = fastICA;

var _mathjs = require("mathjs");

var _numeric = _interopRequireDefault(require("numeric"));

var _pwStat = _interopRequireDefault(require("pw-stat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * FastICA algorithm for independent component analysis
 * @memberof module:bcijs
 * @param {number[][]} signals - The mixed signals. Each row should be a signal and each column a sample.
 * @param {Object} options
 * @param {number} [options.maxIterations=1000] - Maximum number of iterations
 * @param {boolean} [options.debug=false] - If true, prints out debug information while running
 * @param {string} [options.fun=logcosh] - The functional form of the G function used in the approximation of negentropy. Can be either 'exp' or 'logcosh.
 * @returns {Object} An object with the following values: {source: the estimated source matrix, weights: the estimated unmixing matrix, whitening: the computed whitening matrix, iterations: number of iterations taken to converge on each weight}
 */
function fastICA(signals, options) {
  var _Object$assign = Object.assign({
    maxIterations: 1000,
    debug: false,
    fun: 'logcosh'
  }, options),
      maxIterations = _Object$assign.maxIterations,
      debug = _Object$assign.debug,
      fun = _Object$assign.fun;

  var negentropyFunctions = {
    'logcosh': {
      g: function g(u) {
        return (0, _mathjs.tanh)(u);
      },
      gp: function gp(u) {
        return (0, _mathjs.subtract)(1, (0, _mathjs.dotPow)((0, _mathjs.tanh)(u), 2));
      }
    },
    'exp': {
      g: function g(u) {
        return (0, _mathjs.dotMultiply)(u, (0, _mathjs.exp)((0, _mathjs.dotDivide)((0, _mathjs.dotPow)(u, 2), -2)));
      },
      gp: function gp(u) {
        return (0, _mathjs.dotMultiply)((0, _mathjs.subtract)(1, (0, _mathjs.dotPow)(u, 2)), (0, _mathjs.exp)((0, _mathjs.dotDivide)((0, _mathjs.dotPow)(u, 2), -2)));
      }
    }
  };

  if (!negentropyFunctions.hasOwnProperty(fun)) {
    throw new Error("Negentropy approximation function must be either 'exp' or 'logcosh'");
  }

  var eigs = _numeric.default.eig(_pwStat.default.cov((0, _mathjs.transpose)(signals)));

  var V = eigs.E.x;
  var D = eigs.lambda.x;
  /* As covariance matrices are positive semi-definite and symmetric, all eigenvalues are nonnegative.
     Sometimes very small negatives are returned due to issues with numerical precision. This will cause problems
     later as we raise each value to the -1/2 power and complex numbers will break the code. To solve, setting
     D to equal abs(D). Should eventually find a better way to handle eigenvalues that are 0. */

  D = (0, _mathjs.abs)(D);
  var mu = (0, _mathjs.mean)(signals, 1);
  var centered = [];

  for (var i = 0; i < signals.length; i++) {
    centered.push([]);

    for (var j = 0; j < signals[i].length; j++) {
      centered[i].push(signals[i][j] - mu[i]);
    }
  }

  var whitening = (0, _mathjs.multiply)((0, _mathjs.diag)(D.map(function (i) {
    return (0, _mathjs.pow)(i, -1 / 2);
  })), (0, _mathjs.transpose)(V));
  var whitened = (0, _mathjs.multiply)(whitening, centered);
  var g = negentropyFunctions[fun].g;
  var gp = negentropyFunctions[fun].gp;

  var _size = (0, _mathjs.size)(whitened),
      _size2 = _slicedToArray(_size, 2),
      N = _size2[0],
      M = _size2[1]; // In this case, getting a component for each dimension, but we could opt to use fewer


  var numComponenents = N; // Create a weight vector for each component

  var weights = [];

  for (var _i2 = 0; _i2 < numComponenents; _i2++) {
    weights.push((0, _mathjs.random)([N]));
  }

  var totalIterations = [];

  for (var p = 0; p < numComponenents; p++) {
    var previousWeight = (0, _mathjs.clone)(weights[p]);

    if (debug) {
      console.log(new Date().toLocaleTimeString(), 'Computing component', p + 1, '/', numComponenents);
    }

    var converged = false;

    for (var _i3 = 0; _i3 < maxIterations; _i3++) {
      // Convergence test
      var a = previousWeight;
      var b = weights[p];
      var cosTheta = (0, _mathjs.dot)(a, b) / ((0, _mathjs.norm)(a) * (0, _mathjs.norm)(b));
      var delta = 1 - (0, _mathjs.abs)(cosTheta);
      previousWeight = b;

      if (debug && _i3 == 0) {
        console.log(new Date().toLocaleTimeString(), 'On iteration', _i3 + 1, '/', maxIterations);
      }

      if (debug && (_i3 + 1) % 10 == 0) {
        console.log(new Date().toLocaleTimeString(), 'On iteration', _i3 + 1, '/', maxIterations, 'with a change of', Math.acos(Math.abs(cosTheta)), 'rad');
      }

      if (_i3 != 0 && delta < 5e-11) {
        totalIterations.push(_i3);
        converged = true;

        if (debug) {
          console.log(new Date().toLocaleTimeString(), 'Converged on iteration', _i3);
        }

        break;
      }

      weights[p] = (0, _mathjs.transpose)((0, _mathjs.subtract)((0, _mathjs.multiply)(1 / M, whitened, (0, _mathjs.transpose)(g((0, _mathjs.multiply)(weights[p], whitened)))), (0, _mathjs.multiply)(1 / M, (0, _mathjs.sum)(gp((0, _mathjs.multiply)(weights[p], whitened))), (0, _mathjs.transpose)(weights[p]))));

      for (var _j = 0; _j < p; _j++) {
        weights[p] = (0, _mathjs.subtract)(weights[p], (0, _mathjs.multiply)(weights[p], (0, _mathjs.transpose)(weights[_j]), weights[_j]));
      }

      weights[p] = (0, _mathjs.divide)(weights[p], (0, _mathjs.norm)(weights[p]));
    }

    if (!converged) {
      totalIterations.push(maxIterations);

      if (debug) {
        console.log('Stopped at maxIterations before converged');
      }
    }
  }

  ;
  var source = (0, _mathjs.multiply)(weights, whitened);
  return {
    source: source,
    weights: weights,
    whitening: whitening,
    iterations: totalIterations
  };
}