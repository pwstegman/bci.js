/**
 * Calculate the accuracy of a classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a confusion matrix
 * @returns {number} The accuracy
 */
function accuracy(confusionMatrix){
    let correct = 0;
    for(let i = 0; i < confusionMatrix.length; i++){
        correct += confusionMatrix[i][i];
    }

    let total = 0;
    for(let i = 0; i < confusionMatrix.length; i++){
        for(let j = 0; j < confusionMatrix.length; j++){
            total += confusionMatrix[i][j];
        }
    }

    return correct / total;
}

module.exports = accuracy;
