"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompt = prompt;

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prompts the user for input via stdin
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @function
 * @name prompt
 * @param {string} question - Question shown to user
 * @returns {Promise} A promise object that resolves with the response
 */
function prompt(question) {
  var rl = _readline.default.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(function (resolve) {
    rl.question(question, function (answer) {
      rl.close();
      resolve(answer);
    });
  });
}