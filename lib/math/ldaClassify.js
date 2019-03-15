const ldaProject = require('./ldaProject');

/**
 * Classify an unknown data point.
 * @memberof module:bcijs
 * @param {object} ldaParams - The parameters for the LDA, computed with the function ldaLearn
 * @param {number[]|number[][]} point - The data point or array of points to be classified.
 * @returns {number} 0 if the first class, 1 if the second class
 */
function ldaClassify(ldaParams, point) {
    let result = ldaProject(ldaParams, point);
    
    if(Array.isArray(result)){
        for(let i = 0; i < result.length; i++){
            result[i] = result[i] < 0 ? 0 : 1;
        }
    } else {
        result = result < 0 ? 0 : 1;
    }

    return result;
}

module.exports = ldaClassify;
