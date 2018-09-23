/**
 * Returns the ceil of the log2 of the absolute value of the passed number
 * @memberof module:bcijs
 * @param {number} num
 * @returns {number} The ceil of the log2 of the absolute value of the passed number 
 * @example
 * nextpow2(8); // 3
 * nextpow2(9); // 4
 * nextpow2(16); // 4
 * nextpow2(30); // 5
 * nextpow2(0); // -Infinity
 */
function nextpow2(num){
    return Math.ceil(Math.log2(Math.abs(num)));
}

module.exports = nextpow2;