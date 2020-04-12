"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;

// Use setTimeout as a promise

/**
 * @memberof module:bcijs
 * @function
 * @name wait
 * @param {number} ms - Number of milliseconds to wait
 * @returns {Promise} A promise which resolves when the timeout occurs
 */
function wait(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}