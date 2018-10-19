describe('f1score', function(){
    it('computes the f1 score of a binary classifier given its confusion matrix', function(){
        let cMatrix = bci.confusionMatrix([0, 0, 0, 1, 1, 1, 1], [0, 0, 1, 0, 1, 0, 0]);
        let expectedf1 = 0.5;
        assert(Math.abs(bci.f1score(cMatrix) - 0.5) < 0.00001);
    });
});
