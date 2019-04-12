const bci = require('../../index.js'); // bcijs

// Training set
let class1 = [
	[0, 0],
	[1, 2],
	[2, 2],
	[1.5, 0.5]
];
let class2 = [
	[8, 8],
	[9, 10],
	[7, 8],
	[9, 9]
];

// Testing set
let unknownPoints = [
	[-1, 0],
	[1.5, 2],
	[3, 3],
	[5, 5],
	[7, 9],
	[10, 12]
];

// Learn an LDA classifier
let ldaParams = bci.ldaLearn(class1, class2);

// Test classifier
let predictions = bci.ldaClassify(ldaParams, unknownPoints);

console.log(predictions); // [ 0, 0, 0, 1, 1, 1 ]
