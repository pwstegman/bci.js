const reqlib = require('app-root-path').require;
const bci = reqlib('index.js');

const assert = require('assert');

describe('nextpow2', function(){
    it('Returns the ceil of the log2 of the abs of the passed number', function(){
        var actual = [-32, -30, 9, 8, 7, 4, 3, 0, 1, 30, 32].map(x => Math.pow(2, bci.nextpow2(x)));
        var expected = [32, 32, 16, 8, 8, 4, 4, 0, 1, 32, 32];
        assert.deepEqual(actual, expected);
    });
});