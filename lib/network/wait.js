// Use setTimeout as a promise
/**
 * @memberof module:bcijs
 * @function
 * @name wait
 * @param {number} ms - Number of milliseconds to wait
 * @returns {Promise} A promise which resolves when the timeout occurs
 */
module.exports = ms => new Promise(resolve => setTimeout(resolve, ms));