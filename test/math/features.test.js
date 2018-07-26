const reqlib = require('app-root-path').require;
const bci = reqlib('index.js');

const assert = require('assert');
const arrayAlmostEqual = reqlib('/test/util/arrayAlmostEqual.js');

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