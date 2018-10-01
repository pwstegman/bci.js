describe('CSP (deprecated: replaced by cspLearn and cspProject)', function () {
    describe('#project', function () {
        it('Should return CSP projected data', function () {
            var a = [[-1, -1], [1, 1]];
            var b = [[-1, 1], [1, -1]];

            var csp = new bci.signal.CSP(a, b);

            var ap = csp.project(a, 2);
            var bp = csp.project(b, 2);

            assert(arrayAlmostEqual(ap, [[1.414213562373095, 0], [-1.414213562373095, 0]], 0.00001));
            assert(arrayAlmostEqual(bp, [[0, -1.414213562373095], [0, 1.414213562373095]], 0.00001));
        });
    });
});
