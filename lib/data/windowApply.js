/**
 * TODO
 * @param {any} array
 * @param {any} func
 * @param {any} length
 * @param {any} step
 * @param {any} tail
 */
function windowApply(array, func, length, step = -1, tail = true) {
	if (step == -1) step = length;

	var result = [];

	for (var i = 0; i < array.length; i += step) {
		var window = array.slice(i, i + length);
		if (tail || window.length == length) {
			result.push(func(window));
		}
	}

	return result;
}

module.exports = windowApply;