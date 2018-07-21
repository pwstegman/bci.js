const reqlib = require('app-root-path').require;
const bci = reqlib('index.js');

const assert = require('assert');

describe('subscript', function(){
    it('Applies MATLAB style subscripting to an array', function(){
        var data = [[1,2,3], [1,2,3], [1,2,3]];
        var sub = bci.subscript(data, ":", "1 3");
        assert.deepEqual(sub, [[1,3], [1,3], [1,3]]);
    });
});