var pwcsp = require('pw-csp');

/**
 * Creates a new CSP object
 * @name CSP
 * @memberof module:bcijs.signal
 * @constructor
 * @param {number[][]} class1 - Data samples for class 1. Rows should be samples, columns should be signals.
 * @param {number[][]} class2 - Data samples for class 2. Rows should be samples, columns should be signals.
 */

/**
 * Projects data and reduces to given number of dimensions
 * @name project
 * @memberof module:bcijs.signal.CSP
 * @function
 * @param {number[][]} data - Data points to be projected. Rows should be samples, columns should be signals.
 * @param {number} [dimensions] - Number of dimensions to be returned. Can range from 1 to number of signals. Defaults to number of signals.
 * @returns {number[][]} Projected data. Rows are samples, columns are dimensions sorted by descending importance.
 */

module.exports = pwcsp;
