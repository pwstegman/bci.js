/**
 * Partitions an array into multiple arrays
 * Can be used to split data into training and testing sets
 * @memberof module:bcijs
 * @param {Array} array - The array to be partitioned
 * @param {...number[]} divisions - The size of each partition, each value should range from 0 to 1
 * @example
 * partition([1, 2, 3, 4], 0.25, 0.75); // returns [[1], [2, 3, 4]]
 * @returns {Array.<Array>} Array of subarrays which are the partitons
 */
function partition(array, ...divisions) {
    var parts = [];

    var lastDivision = 0;
    var runningSum = 0;
    divisions.forEach(division => {
        runningSum += division;
        var end = Math.round(runningSum * array.length);
        parts.push(array.slice(lastDivision, end));
        lastDivision = end;
    });

    return parts;
}

module.exports = partition;