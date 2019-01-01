/**
 * Calculate the f1 score of a binary classifier given its confusion matrix
 * 
 * This method uses the following definition of a confusion matrix:
 * C = [
 *   [true positive, false negative],
 *   [false positive, true negative]
 * ]
 * which does not match the definition provided by the method bcijs.confusionMatrix.
 * As such, it has been deprecated and replaced with the method bcijs.f1 in order to prevent a version breaking change.
 * @memberof module:bcijs
 * @deprecated since version 1.5.0 (Please use bcijs.f1 instead)
 * @param {number[][]} confusionMatrix - a 2x2 confusion matrix
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
