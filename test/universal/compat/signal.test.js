const bci = require('../../../index.js');

const assert = require('assert');

describe('signal (deprecated: methods are now standalone)', function () {
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

    describe('csp', function () {
		it('bci.csp should point to bci.signal.CSP', function () {
			assert.equal(bci.csp, bci.signal.CSP);
		});
	});
});