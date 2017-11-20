var assert = require('assert');
var webbci = require('../index.js');

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

function arrayAlmostEqual(arr1, arr2, tolerance) {

	var a = flatten(arr1);
	var b = flatten(arr2);

	if (a.length != b.length) {
		return false;
	}

	for (var i = 0; i < a.length; i++) {
		if (Math.abs(a[i] - b[i]) > tolerance) {
			return false;
		}
	}

	return true;
}

describe('signal', function () {
	describe('CSP', function () {
		describe('#project', function() {
			it('Should return CSP projected data', function () {
				var a = [[-1, -1], [1, 1]];
				var b = [[-1, 1], [1, -1]];

				var csp = new webbci.signal.CSP(a, b);

				var ap = csp.project(a, 2);
				var bp = csp.project(b, 2);

				assert(arrayAlmostEqual(ap, [[1.414213562373095, 0], [-1.414213562373095, 0]], 0.00001));
				assert(arrayAlmostEqual(bp, [[0, -1.414213562373095], [0, 1.414213562373095]], 0.00001));
			});
		});
	});

	describe('generate and getBandPower', function () {
		it('Should generate a signal and return the average power in a frequency band', function () {
			// Generate 1 second of sample data
			var sampleRate = 512;
			var duration = 1;
			var amplitudes = [1, 2, 4, 8];
			var frequencies = [
				1, // 1 Hz, delta range
				5, // 5 Hz, theta range
				8, // 8 Hz, alpha range
				17 // 17 Hz, beta range
			];

			var signal = webbci.signal.generate(amplitudes, frequencies, sampleRate, duration);

			// Get frequency powers in signal
			var length = sampleRate * duration;
			var psd = webbci.signal.getPSD(length, signal);

			// Compute average power in each frequency band
			var power_d = webbci.signal.getBandPower(length, psd, sampleRate, 'delta');
			var power_t = webbci.signal.getBandPower(length, psd, sampleRate, 'theta');
			var power_a = webbci.signal.getBandPower(length, psd, sampleRate, 'alpha');
			var power_b = webbci.signal.getBandPower(length, psd, sampleRate, 'beta');

			assert(Math.abs(power_d - 85.333333333) < 0.00001);
			assert(Math.abs(power_t - 128.00000000) < 0.00001);
			assert(Math.abs(power_a - 204.80000000) < 0.00001);
			assert(Math.abs(power_b - 113.77777777) < 0.00001);
		});
	});
});

describe('LDA', function () {
	describe('#project', function () {
		it('Should compute LDA projected data', function () {
			var class1 = [
				[0, 0],
				[1, 2],
				[2, 2],
				[1.5, 0.5]
			];

			var class2 = [
				[8, 8],
				[9, 10],
				[7, 8],
				[9, 9]
			];

			var lda = new webbci.LDA(class1, class2);

			var unknownPoints = [
				[-1, 0],
				[1.5, 2],
				[3, 3],
				[5, 5],
				[7, 9],
				[10, 12]
			];

			var projections = unknownPoints.map(function (p) {
				return lda.project(p);
			});

			assert(arrayAlmostEqual(projections, [
				-25.45927601809955,
				-14.623303167420817,
				-8.53846153846154,
				0.9638009049773757,
				14.633484162895929,
				28.8868778280543
			]));
		});
	});
});

describe('backwards compatibility tests', function () {
	describe('lda', function () {
		it('webbci.lda should point to webbci.LDA', function () {
			assert.equal(webbci.lda, webbci.LDA);
		});
	});

	describe('csp', function () {
		it('webbci.csp should point to webbci.signal.CSP', function () {
			assert.equal(webbci.csp, webbci.signal.CSP);
		});
	});
});
