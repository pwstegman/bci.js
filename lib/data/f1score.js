/**
 * Calculate the f1 score of a binary classifier given its confusion matrix
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a 2x2 confusion matrix as 2d array where columns are predicted classes and rows are actual classes
 * @returns {number} The f1 score
 */
function f1score(confusionMatrix){
    if(confusionMatrix.length != 2 || confusionMatrix[0].length != 2 || confusionMatrix[1].length != 2){
        throw new Error('Confusion matrix must be of size 2x2');
    }

    let precision = confusionMatrix[0][0] / (confusionMatrix[0][0] + confusionMatrix[1][0]);
    let recall = confusionMatrix[0][0] / (confusionMatrix[0][0] + confusionMatrix[0][1]);
    let f1 = 2*recall*precision / (recall + precision);
    return f1;
}

module.exports = f1score;