const csv = require('csvtojson');

/**
 * Loads a CSV file into an array
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @param {string} filePath - The path to the CSV file
 * @returns {Promise} A promise object which resolves to the CSV data array
 */
function loadCSV(filePath) {
	return new Promise(function (resolve, reject) {
		var data = [];

		csv({ noheader: true })
			.fromFile(filePath)
			.on('csv', (row) => {
				data.push(row.map(Number));
			})
			.on('done', (error) => {
				if (error) reject(error);
				else resolve(data);
			});
	});
}

module.exports = loadCSV;