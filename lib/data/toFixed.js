/**
 * Returns an array of numbers as strings rounded to the proper number of decimal places and padded with zeros as needed.
 * @memberof module:bcijs
 * @param {Array} array
 * @param {number} places
 * @returns {string[]} Array of string representations of numbers
 */
function toFixed(array, places) {
	return helper(array);

	function helper(array) {
		return array.map(item => {
			if (typeof item === 'number') {
				return item.toFixed(places);
			}

			return helper(item);
		});
	}
}

module.exports = toFixed;