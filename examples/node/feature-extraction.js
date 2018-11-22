const bci = require('../../index.js'); // bcijs

// Some random numbers
let data = [3, 2, 3, 0, 4, 0, 0, 5, 4, 0];

// Partition into training and testing sets
let [training, testing] = bci.partition(data, 0.6, 0.4);

console.log(training); // [3, 2, 3, 0, 4, 0]
console.log(testing); // [0, 5, 4, 0]

// Traverse the data array with windows of size 3 and a step of 2 (overlap of 1 item per window)
bci.windowApply(data, window => console.log(window), 3, 2);
/*
[ 3, 2, 3 ]
[ 3, 0, 4 ]
[ 4, 0, 0 ]
[ 0, 5, 4 ]
*/

// Find the log of the variance of these windows (feature extraction)
let features = bci.windowApply(data, bci.features.logvar, 3, 2);
console.log(features); // [-1.099, 1.466, 1.674, 1.946]

// Colon notation for array subscripting
let arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
let subarr = bci.subscript(arr, '1 3', '2:3'); // rows 1 and 3, columns 2 through 3
console.log(subarr);
/*
[[2, 3],
 [8, 9]]
*/
