const assert = require('assert');
const arrayAlmostEqual = require('../util/arrayAlmostEqual.js');

describe('ldaLearn and ldaProject', function(){
    it('Runs linear discriminant analysis on data', function(){
        var class1 = [
            [0, 0],
            [1, 2],
            [2, 2],
            [1.5, 0.5]
        ];

        var class2 = [
            [8, 8],
            [9, 10],
            [7, 8],
            [9, 9]
        ];

        var params = bci.ldaLearn(class1, class2);

        var unknownPoints = [
            [-1, 0],
            [1.5, 2],
            [3, 3],
            [5, 5],
            [7, 9],
            [10, 12]
        ];

        var projections = unknownPoints.map(function (p) {
            return bci.ldaProject(params, p);
        });

        assert(arrayAlmostEqual(projections, [
            -25.45927601809955,
            -14.623303167420817,
            -8.53846153846154,
            0.9638009049773757,
            14.633484162895929,
            28.8868778280543
        ]));
    });
});