describe('confusionMatrix', function(){
    it('generates a confusion matrix for predicted and actual classes', function(){
        assert.deepEqual(
            bci.confusionMatrix([0, 0, 0, 1, 1, 2], [0, 0, 1, 1, 2, 0]),
            [[2, 0, 1], [1, 1, 0], [0, 1, 0]]
        );
    });
});
