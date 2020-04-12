"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confusionMatrix = confusionMatrix;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Generate a confusion matrix C where rows are actual classes and columns are predicted classes.
 * C = [
 *   [true negative, false positive],
 *   [false negative, true positive]
 * ].
 * 
 * If two classes are passed, class 0 represents the negative case, and class 1 represents the positive case.
 * If more than two classes are passed, an NxN confusion matrix is returned where N is the number of classes.
 * @memberof module:bcijs
 * @param {number[]} predictedClasses - An array of predicted classes, with class numbers starting at 0
 * @param {number[]} actualClasses - An array of the actual classes, with class numbers starting at 0
 * @returns {number[][]} The confusion matrix
 */
function confusionMatrix(predictedClasses, actualClasses) {
  if (predictedClasses.length != actualClasses.length) {
    throw new Error('predictedClasses length must equal actualClasses length');
  }

  var largestClass = Math.max.apply(Math, _toConsumableArray(predictedClasses.concat(actualClasses))); // Fill a 2d array of size (largestClass + 1) x (largestClass + 1) with zeros

  var cMatrix = Array(largestClass + 1).fill().map(function () {
    return Array(largestClass + 1).fill(0);
  });

  for (var i = 0; i < predictedClasses.length; i++) {
    var predicted = predictedClasses[i];
    var actual = actualClasses[i];
    cMatrix[actual][predicted]++;
  }

  return cMatrix;
}