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

        var actual = bci.generateSignal([1, 2], [7, 3], 8, 2);
        // Expected value computed with GNU Octave as sin(2*pi*7*x)*1+sin(2*pi*3*x)*2 where x is 0:1/8:2-1/8
        var expected = [0, 0.70711, -3, 0.70711, 0, -0.70711, 3, -0.70711, 0, 0.70711, -3, 0.70711, 0, -0.70711, 3, -0.70711];
        assert(arrayAlmostEqual(actual, expected, 0.00001));
    });
});
