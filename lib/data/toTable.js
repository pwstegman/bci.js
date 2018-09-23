const Table = require('easy-table');
const toFixed = require('./toFixed.js');

/**
 * Returns an ASCII table representation of an array
 * @memberof module:bcijs
 * @param {Array} array
 * @returns {string} ASCII table
 */
function toTable(array) {
	return Table.print(array);
}

module.exports = toTable;