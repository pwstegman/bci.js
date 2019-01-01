/**
 * Calculate the Matthews correlation coefficient (MCC) of a binary classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a 2x2 confusion matrix
 * @returns {number} The Matthews correlation coefficient
 */
function mcc(confusionMatrix){
    if(confusionMatrix.length != 2 || confusionMatrix[0].length != 2 || confusionMatrix[1].length != 2){
        throw new Error('Confusion matrix must be of size 2x2');
    }

    let TN = confusionMatrix[0][0];
    let FP = confusionMatrix[0][1];
    let FN = confusionMatrix[1][0];
    let TP = confusionMatrix[1][1];

    return (TP * TN - FP * FN) / Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
}

module.exports = mcc;
