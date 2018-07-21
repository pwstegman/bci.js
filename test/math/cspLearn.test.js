const reqlib = require('app-root-path').require;
const bci = reqlib('index.js');

const assert = require('assert');
const arrayAlmostEqual = reqlib('/test/util/arrayAlmostEqual.js');

describe('cspLearn and cspProject', function(){
    it('Learns parameters for a CSP transformation on a set of signals', function(){
        var A = [[-1, -1], [1, 1]];
        var B = [[-1, 1], [1, -1]];

        var params = bci.cspLearn(A, B);

        var Ap = bci.cspProject(params, A);
        var Bp = bci.cspProject(params, B);

        assert(arrayAlmostEqual(Ap, [[1.414213562373095, 0], [-1.414213562373095, 0]], 0.00001));
        assert(arrayAlmostEqual(Bp, [[0, -1.414213562373095], [0, 1.414213562373095]], 0.00001));
    });
});