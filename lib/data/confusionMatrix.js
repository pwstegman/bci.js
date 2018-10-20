/**
 * Generate a confusion matrix where rows are actual classes and columns are predicted classes
 * @memberof module:bcijs
 * @param {number[]} predictedClasses - An array of predicted classes, with class numbers starting at 0
 * @param {number[]} actualClasses - An array of the actual classes, with class numbers starting at 0
 * @returns {number[][]} The confusion matrix
 */
function confusionMatrix(predictedClasses, actualClasses){
    if(predictedClasses.length != actualClasses.length){
        throw new Error('predictedClasses length must equal actualClasses length');
    }
    
    let largestClass = Math.max(...predictedClasses.concat(actualClasses));
    // Fill a 2d array of size (largestClass + 1) x (largestClass + 1) with zeros
    let cMatrix = Array(largestClass + 1).fill().map(() => Array(largestClass + 1).fill(0));

    for(let i = 0; i < predictedClasses.length; i++){
        let predicted = predictedClasses[i];
        let actual = actualClasses[i];

        cMatrix[actual][predicted]++;
    }

    return cMatrix;
}

module.exports = confusionMatrix;