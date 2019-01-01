const precision = require('./precision.js');
const recall = require('./recall.js');

/**
 * Calculate the f1 score of a binary classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a 2x2 confusion matrix
 * @returns {number} The f1 score
 */
function f1(confusionMatrix){
    if(confusionMatrix.length != 2 || confusionMatrix[0].length != 2 || confusionMatrix[1].length != 2){
        throw new Error('Confusion matrix must be of size 2x2');
    }

    let p = precision(confusionMatrix);
    let r = recall(confusionMatrix);
    let f1 = 2 * p * r / (p + r);
    return f1;
}

module.exports = f1;
