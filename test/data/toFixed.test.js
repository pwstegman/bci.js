const reqlib = require('app-root-path').require;
const bci = reqlib('index.js');

const assert = require('assert');

describe('toFixed', function(){
    it('Rounds and zero pads as a string every value in an array to a set number of decimal places', function(){
        var arr = [1, 1.1, [1.12], [1.129]];
        var fixed = bci.toFixed(arr, 2);
        assert.deepEqual(fixed, ['1.00', '1.10', ['1.12'], ['1.13']]);
    });
});