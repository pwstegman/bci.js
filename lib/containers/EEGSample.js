/**
 * Keeps track of dimensions when working with EEG data
 */
class EEGSample {
	/**
	 * Specify what the rows of the data array are
	 * @param {string} rows=samples - What each row of the data array represents. Can be either 'samples' or 'channels';
	 */
	constructor(rows = 'samples') {

		if (rows != 'samples' && rows != 'channels') {
			console.error("Dimension name must be either 'samples' or 'channels'");
		}

		this.rows = rows;
		this.data = [];
	}

	push(data) {
		this.data.push(data);
	}
}

module.exports = EEGSample;