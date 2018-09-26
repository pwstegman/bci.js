// From https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript/39000004#39000004
const flatten = function (arr, result = []) {
	for (let i = 0, length = arr.length; i < length; i++) {
		const value = arr[i];
		if (Array.isArray(value)) {
			flatten(value, result);
		} else {
			result.push(value);
		}
	}
	return result;
};

function arrayAlmostEqual(arr1, arr2, tolerance = 0.00001) {

	var a = flatten(arr1);
	var b = flatten(arr2);

	if (a.length != b.length) {
		return false;
	}

	for (var i = 0; i < a.length; i++) {
		var diff = Math.abs(a[i] - b[i]);
		if (isNaN(diff) || diff > tolerance) {
			return false;
		}
	}

	return true;
}

module.exports = arrayAlmostEqual;