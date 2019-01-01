/**
 * Calculate the recall of a binary classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a 2x2 confusion matrix
 * @returns {number} The recall (true positive rate)
 */
function recall(confusionMatrix){
    if(confusionMatrix.length != 2 || confusionMatrix[0].length != 2 || confusionMatrix[1].length != 2){
        throw new Error('Confusion matrix must be of size 2x2');
    }

    return confusionMatrix[1][1] / (confusionMatrix[1][1] + confusionMatrix[1][0]);
}

module.exports = recall;
