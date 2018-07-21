const assert = require('assert');
const reqlib = require('app-root-path').require;
const arrayAlmostEqual = reqlib('/test/util/arrayAlmostEqual.js');
const bci = reqlib('index.js');

// TODO: Move rest of tests into their own files

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
