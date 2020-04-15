"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscript = subscript;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Subscript an array with MATLAB-like syntax
 * @memberof module:bcijs
 * @param {Array} array - The array to be subscripted
 * @param {...string} params - Colon notation for which elements to include in each dimension
 * @returns {Array} The subscripted array
 * @example
 * var bci = require('bcijs');
 * var arr = [3, 2, 4, 1, 5];
 * var subarr = bci.subscript(arr, '1:3');
 * console.log(subarr); // [3, 2, 4]
 * @example
 * var bci = require('bcijs');
 * var arr = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ];
 * var subarr = bci.subscript(arr, '1 3', '2:3'); // rows 1 and 3, columns 2 through 3
 * console.log(subarr); // [[2, 3], [8, 9]]
 */
function subscript(array) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return recur.apply(void 0, [array].concat(params));

  function recur(array) {
    for (var _len2 = arguments.length, dims = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      dims[_key2 - 1] = arguments[_key2];
    }

    var arr = slice(array, dims.shift(), "matlab");

    if (dims.length != 0) {
      for (var i = 0; i < arr.length; i++) {
        arr[i] = recur.apply(void 0, [arr[i]].concat(dims));
      }
    }

    return arr;
  }

  function slice(array, dims) {
    var _ref;

    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "python";
    dims = dims.split(" ");
    var subs = [];
    dims.forEach(function (dim) {
      var cp = dim.indexOf(':');
      var indexes = dim.split(':');

      if (indexes.length > 2 || dim == '') {
        console.error("Invalid subscript string");
        return;
      }

      if (indexes[1] == '') {
        indexes[1] = array.length;
      }

      indexes = indexes.map(Number);

      if (format == "matlab" || format == "mat") {
        // TODO: Implement 'end' keyword
        // This format is still in beta
        if (indexes[0] > 0) {
          indexes[0] -= 1;
        }

        if (indexes[1] == -1) {
          indexes[1] = array.length;
        }

        if (indexes[1] < 0) {
          indexes[1] += 1;
        }
      }

      if (indexes.length == 1) {
        indexes.push(indexes[0] + 1);
      }

      subs.push(array.slice.apply(array, _toConsumableArray(indexes)));
    });
    return (_ref = []).concat.apply(_ref, subs);
  }
}