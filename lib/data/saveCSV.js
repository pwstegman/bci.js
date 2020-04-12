"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveCSV = saveCSV;

var _fastCsv = _interopRequireDefault(require("fast-csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Saves an array to a CSV file
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @param {Array} array
 * @param {string} filename
 * @returns {Promise} A promise object that resolves when the file has been saved. Does not currently reject on write error.
 */
function saveCSV(array, filename) {
  return new Promise(function (resolve, reject) {
    _fastCsv.default.writeToPath(filename, array, {
      headers: false
    }).on("finish", function () {
      resolve();
    });
  });
}