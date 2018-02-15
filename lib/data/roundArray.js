function round(array, places) {
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

module.exports = round;