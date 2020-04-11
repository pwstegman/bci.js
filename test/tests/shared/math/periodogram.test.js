describe('periodogram', function(){
    it('Estimates the power spectral density of a signal', function(){
        let x = [3, 1, 7, 3, 2, 4, 0, 1, 9, 9, 5, 0, 2, 3, 8, 0];
        let sample_rate = 256;

        // Test simple periodogram
        let expected_pxx = [0.793212890625000, 0.025574800223023, 0.064745107298070, 0.237807400002717, 0.090332031250000, 0.036434178601641, 0.026075205201930, 0.049792996172619, 0.054931640625000];
        let expected_freqs = [0, 16, 32, 48, 64, 80, 96, 112, 128];

        let psd = bci.periodogram(x, sample_rate);
        assert(arrayAlmostEqual(psd.estimates, expected_pxx));
        assert(arrayAlmostEqual(psd.frequencies, expected_freqs));

        // Test simple modified periodogram (Hann window)
        expected_pxx = [0.61077738309674956,0.52693445984258913,0.23675945661507949,0.27423305475459819,0.1706113802464708,0.078403667695656792,0.022368878997280024,0.010076490396162504,0.0035012041133038784];
        psd = bci.periodogram(x, sample_rate, {window: 'hann'});
        assert(arrayAlmostEqual(psd.estimates, expected_pxx));
        assert(arrayAlmostEqual(psd.frequencies, expected_freqs));

        // Test zero-padded periodogram
        expected_pxx = [0.793212890625000, 0.738576904292509, 0.025574800223023, 0.046716675752220, 0.064745107298070, 0.251971855180556, 0.237807400002717, 0.157760249523015, 0.090332031250000, 0.017443193130202, 0.036434178601641, 0.110527823419029, 0.026075205201930, 0.039930950479329, 0.049792996172619, 0.015978598223140, 0.054931640625000];
        expected_freqs = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128];
        psd = bci.periodogram(x, sample_rate, {fftSize: 32});
        assert(arrayAlmostEqual(psd.estimates, expected_pxx));
        assert(arrayAlmostEqual(psd.frequencies, expected_freqs));

        // Test zero-padded modified periodogram (Hann window)
        expected_pxx = [0.61077738309674956,0.97700863796377757,0.52693445984258913,0.26782760206392503,0.23675945661507944,0.27739023604665763,0.2742330547545983,0.22198850008257248,0.1706113802464708,0.126093624711313,0.078403667695656792,0.040926358318390227,0.022368878997280028,0.015549105940294,0.010076490396162504,0.0068819106309606481,0.0035012041133038784];
        psd = bci.periodogram(x, sample_rate, {fftSize: 32, window: 'hann'});
        assert(arrayAlmostEqual(psd.estimates, expected_pxx));
        assert(arrayAlmostEqual(psd.frequencies, expected_freqs));
    });
});
