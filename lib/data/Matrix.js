var Table = require('easy-table');
var math = require('mathjs');

class Matrix {
	constructor(arr, rows, cols) {
		if (typeof arr !== 'undefined') {
			this.array = arr.slice(0);
		} else {
			this.array = new Array();
		}

		this.dims = [];

		if (typeof rows !== 'undefined') {
			this.setRows(rows);
		}
		if (typeof cols !== 'undefined') {
			this.setCols(cols);
		}
	}

	setDimension(dim, name) {
		this.dims[dim] = name;
	}

	nameDimension(dim, name) {
		this.setDimension(dim, name);
	}

	setDim(dim, name) {
		setDimension(dim, name);
	}

	setName(name) {
		this.name = name;
	}

	setRows(name) {
		this.dims[0] = name;
	}

	setCols(name) {
		this.dims[1] = name;
	}

	get rows() {
		return this.dims[0];
	}

	get cols() {
		return this.dims[1];
	}

	set rows(name) {
		this.setRows(name);
	}

	set cols(name) {
		this.setCols(name);
	}

	add() {
		this.array.push(...arguments);
	}

	push() {
		this.add(...arguments);
	}

	get length() {
		return this.array.length;
	}

	subscript(...params) {
		var result = recur(this.array, ...params);
		var mat = new Matrix(result);
		mat.dims = this.dims.slice(0);
		return mat;

		function recur(array, ...dims) {
			var arr = slice(array, dims.shift(), "matlab");

			if (dims.length != 0) {
				for (var i = 0; i < arr.length; i++) {
					arr[i] = recur(arr[i], ...dims);
				}
			}

			return arr;
		}

		function slice(array, dims, format = "python") {
			dims = dims.split(" ");

			var subs = [];

			dims.forEach(dim => {
				var cp = dim.indexOf(':');
				var indexes = dim.split(':');

				if (indexes.length > 2 || dim == '') {
					console.error("Invalid subscript string");
					return;
				}

				if (indexes[1] == '') {
					indexes[1] = array.length;
				}

				indexes = indexes.map(Number);

				if (format == "matlab" || format == "mat") {
					// TODO: Implement 'end' keyword
					// This format is still in beta
					if (indexes[0] > 0) {
						indexes[0] -= 1;
					}

					if (indexes[1] == -1) {
						indexes[1] = array.length;
					}

					if (indexes[1] < 0) {
						indexes[1] += 1;
					}
				}

				if (indexes.length == 1) {
					indexes.push(indexes[0] + 1);
				}

				subs.push(array.slice(...indexes));
			});

			return [].concat(...subs);
		}
	}

	round(places) {
		return new Matrix(helper(this.array));

		function helper(array) {
			return array.map(item => {
				if (typeof item === 'number') {
					return parseFloat(item.toFixed(places));
				}

				return helper(item);
			});
		}
	}

	toFixed(places) {
		return new Matrix(helper(this.array));

		function helper(array) {
			return array.map(item => {
				if (typeof item === 'number') {
					return item.toFixed(places);
				}

				return helper(item);
			});
		}
	}

	table(places = 5) {
		return Table.print(this.toFixed(places).array);
	}

	transpose() {
		return new Matrix(math.transpose(this.array));
	}

	t() {
		return this.transpose();
	}

	windowApply(func, length, step = -1, tail = true) {
		if (step == -1) step = length;

		var result = [];

		for (var i = 0; i < this.array.length; i += step) {
			var window = this.array.slice(i, i + length);
			if (tail || window.length == length) {
				result.push(func(window));
			}
		}

		return new Matrix(result);
	}

	map(...args) {
		return new Matrix(this.array.map(...args));
	}

	toArray() {
		return this.array;
	}
}

module.exports = Matrix;