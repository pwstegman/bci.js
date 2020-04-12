"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.features = void 0;

var _mathjs = require("mathjs");

var _transpose = require("./transpose");

/** 
 * Feature extraction methods
 * @namespace features
 * @memberof module:bcijs
 */
var features = {};
/**
 * Computes the log of the variance along the specified dimension
 * @memberof module:bcijs.features
 * @param {number[] | number[][]} window - The data
 * @param {string} [dimension] - If 'rows' or 'columns' passed, the features are calculated along that dimension
 */

exports.features = features;

features.logvar = function (window) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (dimension == null) {
    return (0, _mathjs.log)((0, _mathjs.variance)(window));
  }

  var possibleDimensions = ['rows', 'cols', 'columns'];

  if (possibleDimensions.indexOf(dimension) == -1) {
    throw "Invalid dimension";
  }

  if (dimension == 'cols' || dimension == 'columns') {
    window = (0, _transpose.transpose)(window);
  }

  return window.map(function (channel) {
    return (0, _mathjs.log)((0, _mathjs.variance)(channel));
  });
};
/**
 * Computes the variance along the specified dimension
 * @memberof module:bcijs.features
 * @param {number[] | number[][]} window - The data
 * @param {string} [dimension] - If 'rows' or 'columns' passed, the features are calculated along that dimension
 */


features.variance = function (window) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (dimension == null) {
    return (0, _mathjs.log)((0, _mathjs.variance)(window));
  }

  var possibleDimensions = ['rows', 'cols', 'columns'];

  if (possibleDimensions.indexOf(dimension) == -1) {
    throw "Invalid dimension";
  }

  if (dimension == 'cols' || dimension == 'columns') {
    window = (0, _transpose.transpose)(window);
  }

  return window.map(function (channel) {
    return (0, _mathjs.variance)(channel);
  });
};
/**
 * Computes the root mean square along the specified dimension
 * @memberof module:bcijs.features
 * @param {number[] | number[][]} window - The data
 * @param {string} [dimension] - If 'rows' or 'columns' passed, the features are calculated along that dimension
 */


features.rootMeanSquare = function (window) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (dimension == null) {
    return (0, _mathjs.sqrt)((0, _mathjs.mean)((0, _mathjs.square)(window)));
  }

  var possibleDimensions = ['rows', 'cols', 'columns'];

  if (possibleDimensions.indexOf(dimension) == -1) {
    throw "Invalid dimension";
  }

  if (dimension == 'cols' || dimension == 'columns') {
    window = (0, _transpose.transpose)(window);
  }

  return window.map(function (channel) {
    return (0, _mathjs.sqrt)((0, _mathjs.mean)((0, _mathjs.square)(channel)));
  });
};