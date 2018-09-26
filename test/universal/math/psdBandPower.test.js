const assert = require('assert');

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