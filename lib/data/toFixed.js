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