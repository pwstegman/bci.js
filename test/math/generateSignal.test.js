const reqlib = require('app-root-path').require;
const bci = reqlib('index.js');

const assert = require('assert');

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