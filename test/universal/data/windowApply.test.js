const assert = require('assert');
const math = require('mathjs');

describe('windowApply', function(){
    it('Applies a function over the sub arrays of an array', function(){
        var data = [[1,2], [3,4], [5,6], [7,8], [9,10]];
        var features = bci.windowApply(data, window=>math.sum(window), 3, 2, false);
        assert.deepEqual(features, [21, 45]);
    });
});