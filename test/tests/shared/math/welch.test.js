describe('welch', function(){
    it('Estimates the power spectral density of a signal via Welch\'s method', function(){
        let signal = [
            0.74, 0.19, 0.24, 0.41, 0.76,
            0.98, 0.69, 0.35, 0.78, 0.58,
            0.98, 0.28, 0.43, 0.41, 0.99,
            0.69, 0.34,  0.1, 0.05, 0.18,
            0.34, 0.31, 0.26,  0.1, 0.53,
            0.28, 0.82, 0.63, 0.08, 0.14,
            0.39, 0.54
        ];

        // Test 1
        let sample_rate = 16;
        let expected_pxx = [0.0652132643743328,0.050844494076650995,0.0095159550818967164,0.0041460867318466477,0.0027931048123306691];
        let expected_f = [0,2,4,6,8];

        let psd = bci.welch(signal, sample_rate, {segmentLength: 8});

        assert(arrayAlmostEqual(expected_pxx, psd.estimates));
        assert(arrayAlmostEqual(expected_f, psd.frequencies));

        // Test 2
        sample_rate = 8;
        psd = bci.welch(signal, sample_rate, {segmentLength: 16, overlapLength: 4});

        expected_pxx = [0.29783310848588623,0.18944977244509778,0.0055875095820292764,0.0261321945512213,0.012561971907661234,0.0011220537523812038,0.0055883293473175,0.011838992511658855,0.0078945312059982235];
        expected_f = [0,0.5,1,1.5,2,2.5,3,3.5,4];

        assert(arrayAlmostEqual(expected_pxx, psd.estimates));
        assert(arrayAlmostEqual(expected_f, psd.frequencies));

        // Test 3
        sample_rate = 12;
        psd = bci.welch(signal, sample_rate, {segmentLength: 7, overlapLength: 3, window: 'rectangular', fftSize: 16});

        expected_pxx = [0.15112244897959182,0.15122847775230247,0.019078657487686921,0.04044520577124338,0.015131292517006805,0.0086657297006401974,0.010451954757211042,0.010365348680575833,0.014920408163265305];
        expected_f = [0,0.75,1.5,2.25,3,3.75,4.5,5.25,6];

        assert(arrayAlmostEqual(expected_pxx, psd.estimates));
        assert(arrayAlmostEqual(expected_f, psd.frequencies));

        // Test 4
        sample_rate = 64;
        psd = bci.welch(signal, sample_rate, {segmentLength: 32, overlapLength: 16, window: 'hann', fftSize: 32, verbose: false});

        expected_pxx = [0.063464910363579777,0.035995112809998168,0.0056372757337633164,0.0024015011332492171,0.0022105859098989671,0.0044560822301758117,0.0084397217530125038,0.0031842762778258524,0.00085311054787980708,0.00018014950010804197,0.00049832702381925984,4.3273702239968341e-5,6.3168619263172143e-5,0.00068448384672697732,0.0017798489181692673,0.0013839495791424675,0.0021345383518111953];
        expected_f = [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32];

        assert(arrayAlmostEqual(expected_pxx, psd.estimates));
        assert(arrayAlmostEqual(expected_f, psd.frequencies));
    });
});
