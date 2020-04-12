"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partition = partition;

/**
 * Partitions an array into multiple arrays
 * Can be used to split data into training and testing sets
 * @memberof module:bcijs
 * @param {Array} array - The array to be partitioned
 * @param {...number[]} divisions - The size of each partition, each value should range from 0 to 1
 * @example
 * partition([1, 2, 3, 4], 0.25, 0.75); // returns [[1], [2, 3, 4]]
 * @returns {Array.<Array>} Array of subarrays which are the partitons
 */
function partition(array) {
  var parts = [];
  var lastDivision = 0;
  var runningSum = 0;

  for (var _len = arguments.length, divisions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    divisions[_key - 1] = arguments[_key];
  }

  divisions.forEach(function (division) {
    runningSum += division;
    var end = Math.round(runningSum * array.length);
    parts.push(array.slice(lastDivision, end));
    lastDivision = end;
  });
  return parts;
}