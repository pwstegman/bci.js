var Table = require('easy-table');
var toFixed = require('./toFixed.js');

function table(array, places = 5) {
	return Table.print(toFixed(array, places));
}

module.exports = table;