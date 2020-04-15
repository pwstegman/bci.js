"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCSV = loadCSV;

var _csvtojson = _interopRequireDefault(require("csvtojson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Loads a CSV file into an array
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @param {string} filePath - The path to the CSV file
 * @returns {Promise} A promise object which resolves to the CSV data array
 */
function loadCSV(filePath) {
  return new Promise(function (resolve, reject) {
    var data = [];
    (0, _csvtojson.default)({
      noheader: true
    }).fromFile(filePath).on('csv', function (row) {
      data.push(row.map(Number));
    }).on('done', function (error) {
      if (error) reject(error);else resolve(data);
    });
  });
}