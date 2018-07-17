var assert = require('assert');
var math = require('mathjs');
var tmp = require('tmp');
var path = require('path');
var bci = require('../index.js');

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
		if (Math.abs(a[i] - b[i]) > tolerance) {
			return false;
		}
	}

	return true;
}

describe('data', function(){
	it('Data tests are being moved into their own files as lib/data/*.test.js', function(){});
	// run with mocha .\lib\**\*.test.js
});

describe('math', function(){
	describe('cspLearn and cspProject', function(){
		it('Learns parameters for a CSP transformation on a set of signals', function(){
			var A = [[-1, -1], [1, 1]];
			var B = [[-1, 1], [1, -1]];

			var params = bci.cspLearn(A, B);

			var Ap = bci.cspProject(params, A);
			var Bp = bci.cspProject(params, B);

			assert(arrayAlmostEqual(Ap, [[1.414213562373095, 0], [-1.414213562373095, 0]], 0.00001));
			assert(arrayAlmostEqual(Bp, [[0, -1.414213562373095], [0, 1.414213562373095]], 0.00001));
		});
	});

	describe('features', function(){
		var x = [
			[1, 1],
			[2, 5],
			[3, 3],
			[4, 1],
			[5, 5]
		];

		describe('rootMeanSquare', function(){
			it('Computes root mean square of every column', function(){
				var rms = bci.features.rootMeanSquare(x, 'columns');
				assert(arrayAlmostEqual(rms, [3.3166247903554, 3.492849839314596], 0.00001));
			});
		});
		
		describe('logvar', function(){
			it('Computes the log of the variance of every column', function(){
				var logvar = bci.features.logvar(x, 'columns');
				assert(arrayAlmostEqual(logvar, [0.9162907318741551, 1.3862943611198906], 0.00001));
			});
		});
	});

	describe('generateSignal', function(){
		it('Generates a signal given frequencies and amplitudes', function(){
			var x = bci.generateSignal([10], [5], 256, 1);
			var y = bci.generateSignal([3], [20], 256, 1);
			var z = bci.generateSignal([10, 3], [5, 20], 256, 1);

			assert.equal(x.length, y.length);
			assert.equal(x.length, y.length);

			var same = true;
			for(var i = 0; i < x.length; i++){
				if(Math.abs(x[i] + y[i] - z[i]) > 0.00001){
					same = false;
				}
			}
			assert(same);
		});
	});

	describe('ldaLearn and ldaProject', function(){
		it('Runs linear discriminant analysis on data', function(){
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

			var params = bci.ldaLearn(class1, class2);

			var unknownPoints = [
				[-1, 0],
				[1.5, 2],
				[3, 3],
				[5, 5],
				[7, 9],
				[10, 12]
			];

			var projections = unknownPoints.map(function (p) {
				return bci.ldaProject(params, p);
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

	describe('psd', function(){
		it('Computes the power spectral density of a signal', function(){
			var psd = bci.psd([1,2,1,2,5,2,1,2], {truncate: true});
			assert(arrayAlmostEqual(psd, [16, 4, 4, 4]));

			psd = bci.psd([1,2,3,4], {fftSize: 2});
			assert(arrayAlmostEqual(psd, [3, 1]));

			psd = bci.psd([1,2,3,4], {fftSize: 2, truncate: true});
			assert(arrayAlmostEqual(psd, [3]));
		});
	});

	describe('signalBandPower and psdBandPower', function(){
		it('Computes the average power in a frequency band', function(){
			var bandPower = bci.signalBandPower([1, 2, 3, 4, 5, 6, 7], 256, 'alpha', 8);
			var expected = 19.2263;
			assert(Math.abs(bandPower - expected) < 0.0001);

			bandPower = bci.signalBandPower([1, 2, 3, 4, 5, 6, 7], 256, 'alpha');
			expected = 19.2263;
			assert(Math.abs(bandPower - expected) < 0.0001);

			var psd = bci.psd([1, 2, 3, 4, 5, 6, 7]);
			bandPower = bci.psdBandPower(psd, 256, 'alpha');
			expected = 19.2263;
			assert(Math.abs(bandPower - expected) < 0.0001);
		});
	});

	describe('nextpow2', function(){
		it('Returns the ceil of the log2 of the abs of the passed number', function(){
			var actual = [-32, -30, 9, 8, 7, 4, 3, 0, 1, 30, 32].map(x => Math.pow(2, bci.nextpow2(x)));
			var expected = [32, 32, 16, 8, 8, 4, 4, 0, 1, 32, 32];
			assert.deepEqual(actual, expected);
		});
	});
});

describe('backwards compatibility tests and deprecated methods', function () {
	describe('signal', function () {
		describe('CSP', function () {
			describe('#project', function () {
				it('Should return CSP projected data', function () {
					var a = [[-1, -1], [1, 1]];
					var b = [[-1, 1], [1, -1]];

					var csp = new bci.signal.CSP(a, b);

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

				var signal = bci.signal.generate(amplitudes, frequencies, sampleRate, duration);

				// Get frequency powers in signal
				var length = sampleRate * duration;
				var psd = bci.signal.getPSD(length, signal);

				// Compute average power in each frequency band
				var power_d = bci.signal.getBandPower(length, psd, sampleRate, 'delta');
				var power_t = bci.signal.getBandPower(length, psd, sampleRate, 'theta');
				var power_a = bci.signal.getBandPower(length, psd, sampleRate, 'alpha');
				var power_b = bci.signal.getBandPower(length, psd, sampleRate, 'beta');

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

				var lda = new bci.LDA(class1, class2);

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

	describe('lda', function () {
		it('bci.lda should point to bci.LDA', function () {
			assert.equal(bci.lda, bci.LDA);
		});
	});

	describe('csp', function () {
		it('bci.csp should point to bci.signal.CSP', function () {
			assert.equal(bci.csp, bci.signal.CSP);
		});
	});
});
