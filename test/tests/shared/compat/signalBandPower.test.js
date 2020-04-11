describe('signalBandPower', function(){
    it('Computes the average power in a frequency band', function(){
        let sampleRate = 512;
        let signal = bci.generateSignal([2,16], [10,20], sampleRate, 1);

        let almostEqual = (a, b) => assert(Math.abs(a - b) < 0.00001);

        // Get a single power in one band
        almostEqual(
            102.40000000000029,
            bci.signalBandPower(signal, sampleRate, 'alpha')
        );
        // Specify a custom band as an array (Ex: 8 Hz - 12 Hz)
        almostEqual(
            102.40000000000029,
            bci.signalBandPower(signal, sampleRate, [8, 12])
        );
        // Obtain multiple band powers
        arrayAlmostEqual(
            [ 102.40000000000029, 227.5555555555567 ],
            bci.signalBandPower(signal, sampleRate, ['alpha', 'beta'])
        );
        // Multiple band powers works with custom bands too
        arrayAlmostEqual(
            [ 102.40000000000029, 227.5555555555567 ],
            bci.signalBandPower(signal, sampleRate, [[8, 12], [13, 30]])
        );

        // Works with multiple signals too (example with 2 signals)
        let signal2 = bci.generateSignal([16, 2], [10, 20], 512, 1);
        let samples = bci.transpose([signal, signal2]);
        arrayAlmostEqual(
            [ 102.40000000000029, 819.2000000000011 ],
            bci.signalBandPower(samples, sampleRate, 'alpha')
        );
        // Returns an array containing the alpha value for each signal
        arrayAlmostEqual(
            [ [ 102.40000000000029, 819.2000000000011 ],
            [ 227.5555555555567, 28.444444444444716 ],
            [ 4.0441115495661234e-13, 2.483072194578224e-13 ] ],
            bci.signalBandPower(samples, sampleRate, ['alpha', 'beta', 'gamma'])
        );
    });
});
