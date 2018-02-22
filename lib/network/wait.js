// Use setTimeout as a promise
/**
 * @memberof module:webbci
 * @name wait
 * @param {number} ms - Number of milliseconds to wait
 */
module.exports = ms => new Promise(resolve => setTimeout(resolve, ms));