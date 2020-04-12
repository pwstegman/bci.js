"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTable = toTable;

var _easyTable = _interopRequireDefault(require("easy-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns an ASCII table representation of an array
 * @memberof module:bcijs
 * @param {Array} array
 * @returns {string} ASCII table
 */
function toTable(array) {
  return _easyTable.default.print(array);
}