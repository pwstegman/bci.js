var math = require('mathjs');
var bci = require('../index.js');

// Generate random data to simulate 32 samples along 4 channels
var left = new bci.ds.Matrix(math.random([32, 4]));
var right = new bci.ds.Matrix(math.random([32, 4]));

// CSP project the data
var cspParams = bci.math.cspLearn(left, right);
left = bci.math.cspProject(cspParams, left);
right = bci.math.cspProject(cspParams, right);

// Extract features from data windows
// Feature vector is log of variance of each CSP projected channel in window sizes of 4 with 50% window overlap
// From Christian Kothe's lecture on CSP based BCIs
var leftFeatures = left.windowApply(window => {
	return math.transpose(window).map(data => Math.log(math.var(data)));
}, 4, 2, false);

var rightFeatures = right.windowApply(window => {
	return math.transpose(window).map(data => Math.log(math.var(data)));
}, 4, 2, false);

// Pass feature vectures to LDA for classification
var ldaParams = bci.math.ldaLearn(leftFeatures, rightFeatures);

// Classify data using LDA
var leftEstimates = left.windowApply(window => {
	var features = math.transpose(window).map(data => Math.log(math.var(data)));
	return Math.sign(bci.math.ldaProject(ldaParams, features));
}, 4, 2);

var rightEstimates = right.windowApply(window => {
	var features = math.transpose(window).map(data => Math.log(math.var(data)));
	return Math.sign(bci.math.ldaProject(ldaParams, features));
}, 4, 2);

var correct = leftEstimates.filter(i => i == -1).length + rightEstimates.filter(i => i == 1).length;
var total = leftEstimates.length + rightEstimates.length;

console.log("Accuracy (on random data)", (correct / total));
console.log("This should approach 0.5 as the size of the random data matrix is increased");