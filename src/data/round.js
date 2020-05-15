/**
 * Rounds every value in an array to a set number of decimal places
 * @memberof module:bcijs
 * @function
 * @name round
 * @param {number[]} array
 * @param {number} places
 * @returns {number[]} The rounded array
 */
export function round(array, places) {
	return helper(array);

	function helper(array) {
		return array.map(item => {
			if (typeof item === 'number') {
				return parseFloat(item.toFixed(places));
			}

			return helper(item);
		});
	}
}
