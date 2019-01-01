const recall = require('./recall.js');
const specificity = require('./specificity.js');

/**
 * Calculate the balanced accuracy of a classifier given its confusion matrix as defined by the confusionMatrix method
 * @memberof module:bcijs
 * @param {number[][]} confusionMatrix - a confusion matrix
 * @returns {number} The balanced accuracy
 */
function balancedAccuracy(confusionMatrix){
    let tpr = recall(confusionMatrix);
    let tnr = specificity(confusionMatrix);

    return (tpr + tnr) / 2;
}

module.exports = balancedAccuracy;
