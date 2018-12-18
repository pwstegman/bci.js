/**
 * Transpose an array
 * @param {Array} array - The array to transpose
 * @returns {Array} The transposed array
 */
function transpose(array){
    let rows = array.length;
    let cols = array[0].length;

    // Verify array dimensions
    for(let i = 0; i < rows; i++){
        if(array[i].length != cols){
            throw new Error('Matrix dimension error');
        }
    }

    // Create new array
    let transposed = new Array(cols);
    for(let c = 0; c < cols; c++){
        transposed[c] = new Array(rows);
        for(let r = 0; r < rows; r++){
            transposed[c][r] = array[r][c];
        }
    }

    return transposed;
}
module.exports = transpose;