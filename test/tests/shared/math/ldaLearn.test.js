describe('ldaLearn and ldaProject', function(){
    it('Runs linear discriminant analysis on data', function(){
        let class1 = [
            [0, 0],
            [1, 2],
            [2, 2],
            [1.5, 0.5]
        ];

        let class2 = [
            [8, 8],
            [9, 10],
            [7, 8],
            [9, 9]
        ];

        let params = bci.ldaLearn(class1, class2);

        let unknownPoints = [
            [-1, 0],
            [1.5, 2],
            [3, 3],
            [5, 5],
            [7, 9],
            [10, 12]
        ];

        let projections = unknownPoints.map(p => bci.ldaProject(params, p));

        let projections2 = bci.ldaProject(params, unknownPoints);

        let expectedProjections = [
            -25.45927601809955,
            -14.623303167420817,
            -8.53846153846154,
            0.9638009049773757,
            14.633484162895929,
            28.8868778280543
        ];

        assert(arrayAlmostEqual(projections, expectedProjections));
        assert(arrayAlmostEqual(projections2, expectedProjections));

        let classifications = unknownPoints.map(p => bci.ldaClassify(params, p));
        let classifications2 = bci.ldaClassify(params, unknownPoints);

        let expectedClasses = [0, 0, 0, 1, 1, 1];

        assert.deepStrictEqual(expectedClasses, classifications);
        assert.deepStrictEqual(expectedClasses, classifications2);
    });
});
