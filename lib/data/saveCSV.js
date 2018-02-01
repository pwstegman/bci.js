var csv = require('fast-csv');
var Matrix = require('./Matrix.js');

function saveCSV(array, filename) {
	return new Promise(function (resolve, reject) {
		if (array.constructor.name === 'Matrix') array = array.array;
		csv
			.writeToPath(filename, array, { headers: false })
			.on("finish", function () {
				resolve();
			});
	});
}

module.exports = saveCSV;