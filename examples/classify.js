var wbci = require('webbci');
var LDA = wbci.lda;

// Arrays should be of size 'number of samples' rows x 'number of features' columns
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

var classifier = new LDA(class1, class2);

var unknownPoints = [
	[-1, 0],
	[1.5, 2],
	[3, 3],
	[5, 5],
	[7, 9],
	[10, 12]
];

var predictions = [];

for(var i = 0; i < unknownPoints.length; i++){
	var projection = classifier.project(unknownPoints[i]);
	predictions.push(Math.sign(projection));
}

console.log(predictions); // [ -1, -1, -1, 1, 1, 1 ]