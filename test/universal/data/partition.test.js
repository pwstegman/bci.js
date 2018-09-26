const bci = require('../../../index.js');

const assert = require('assert');

describe('partition', function(){
    it('partitions data into subsets such as training and testing sets', function(){
        assert.deepEqual(
            bci.partition([1, 2, 3, 4], 0.5, 0.5),
            [[1,2], [3,4]]
        );

        assert.deepEqual(
            bci.partition([1, 2, 3, 4, 5, 6], 0.6, 0.4),
            [[1, 2, 3, 4], [5, 6]]
        );
    });
});