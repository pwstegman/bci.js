let actual = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
let predicted = [0, 0, 0, 1, 1, 0, 0, 0, 0, 1];

let confusionMatrix = bci.confusionMatrix(predicted, actual);

describe('confusionMatrix', function(){
    it('generates a confusion matrix for predicted and actual classes', function(){
        assert.deepEqual(
            confusionMatrix,
            [[3, 2],
             [4, 1]]
        );
    });
});

describe('accuracy', function(){
    it('computes the accuracy given a confusion matrix', function(){
        let accuracy = bci.accuracy(confusionMatrix);
        let expected = (3+1)/(3+2+4+1);
        assert.equal(accuracy, expected);
    });
});

describe('balancedAccuracy', function(){
    it('computes the balanced accuracy given a confusion matrix', function(){
        let balancedAccuracy = bci.balancedAccuracy(confusionMatrix);
        let expected = ((3/(3+2)) + (1/(4+1))) / 2; 
        assert.equal(balancedAccuracy, expected);
    });
});

describe('f1', function(){
    it('computes the f1 score given a confusion matrix', function(){
        let precision = 1/(1+2);
        let recall = 1/(1+4);
        let expected = (2 * precision * recall) / (precision + recall);
        let f1 = bci.f1(confusionMatrix);
        assert.equal(f1, expected);
    });
});

describe('mcc', function(){
    it('computes the Matthews correlation coefficient given a confusion matrix', function(){
        let TN = 3;
        let FP = 2;
        let FN = 4;
        let TP = 1;
        let expected = (TP*TN - FP*FN) / Math.sqrt((TP+FP)*(TP+FN)*(TN+FP)*(TN+FN));
        let mcc = bci.mcc(confusionMatrix);
        assert.equal(mcc, expected);
    });
});

describe('precision', function(){
    it('computes the precision given a confusion matrix', function(){
        let expected = 1/(1+2);
        let precision = bci.precision(confusionMatrix);
        assert.equal(precision, expected);
    });
});

describe('recall', function(){
    it('computes the recall given a confusion matrix', function(){
        let expected = 1/(1+4);
        let recall = bci.recall(confusionMatrix);
        assert.equal(recall, expected);
    });
});

describe('specificity', function(){
    it('computes the specificity given a confusion matrix', function(){
        let expected = 3/(3+2);
        let specificity = bci.specificity(confusionMatrix);
        assert.equal(specificity, expected);
    });
});
