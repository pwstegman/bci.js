var Table = require('easy-table');
var toFixed = require('./toFixed.js');

/**
 * Returns an ASCII table representation of an array
 * @param {Array} array
 */
function table(array) {
	return Table.print(array);
}

module.exports = table;