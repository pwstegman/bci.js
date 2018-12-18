describe('averageBandPowers', function(){
    it('computes the power in each frequency band averaged across all channels', function(){
        let samples = [
            [2, 5, 8, 1],
            [8, 9, 3, 5],
            [2, 8, 10, 8],
            [3, 1, 1, 4],
            [7, 5, 7, 5],
            [5, 4, 8, 8],
            [0, 3, 5, 10],
            [0, 9, 0, 4]
        ];

        let expected = [23.364098898045714, 18.773468705022314];
        let actual = bci.averageBandPowers(samples, 256, ['delta', 'gamma']);

        assert(arrayAlmostEqual(expected, actual, 0.00000001));
    });
});
