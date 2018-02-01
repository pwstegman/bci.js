var csv = require('fast-csv');

function saveCSV(array, filename) {
	return new Promise(function (resolve, reject) {
		csv
			.writeToPath(filename, array, { headers: false })
			.on("finish", function () {
				resolve();
			});
	});
}

module.exports = saveCSV;