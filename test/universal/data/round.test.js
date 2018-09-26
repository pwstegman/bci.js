const assert = require('assert');

describe('round', function(){
    it('Rounds every value in an array to a set number of decimal places', function(){
        var arr = [[1.123, 1.55], [5.50000], [17]];
        var arrRounded = bci.round(arr, 1);
        assert.deepEqual(arrRounded, [[1.1, 1.6], [5.5], [17]]);
    });
});
