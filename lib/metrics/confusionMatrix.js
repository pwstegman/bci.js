/**
 * Generate a confusion matrix C where rows are actual classes and columns are predicted classes.
 * C = [
 *   [true negative, false positive],
 *   [false negative, true positive]
 * ].
 * 
 * If two classes are passes, class 0 represents the negative case, and class 1 represents the positive case.
 * If more than two classes are passed, an NxN confusion matrix is returned where N is the number of classes.
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