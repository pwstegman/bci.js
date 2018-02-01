var csv = require('csvtojson');
var Matrix = require('Matrix.js');

function loadCSV(filePath) {
	return new Promise(function (resolve, reject) {
		var data = new Matrix();

		csv({ noheader: true })
			.fromFile(filePath)
			.on('csv', (row) => {
				data.add(row);
			})
			.on('done', (error) => {
				if (error) reject(error);
				else resolve(data);
			});
	});
}

module.exports = loadCSV;