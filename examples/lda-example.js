var bci = require('../index.js');

// Learn an LDA classifier for a 2D vector

// Training set
var class1 = [
	[0, 0],
	[1, 2],
	[2, 2],
	[1.5, 0.5]
];
var class2 = [
	[8, 8],
	[9, 10],
	[7, 8],
	[9, 9]
];

// Testing set
var unknownPoints = [
	[-1, 0],
	[1.5, 2],
	[3, 3],
	[5, 5],
	[7, 9],
	[10, 12]
];

// Learn classifier
var ldaParams = bci.ldaLearn(class1, class2);

// Test classifier
var predictions = unknownPoints.map(point => {
	return Math.sign(bci.ldaProject(ldaParams, point))
});

console.log(predictions); // [ -1, -1, -1, 1, 1, 1 ]