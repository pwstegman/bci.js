var repl = require("repl");
var bci = require('../index.js');
var net = bci.network;
var math = require('mathjs');

// OSC settings
var address = "127.0.0.1";
var port = 7000;
var header = "Person1/eeg";

// Collect training data
async function collectTraining() {
	console.log("Move your right hand.");

	var rightHand = await net.oscCollect(address, port, header, 250 * 10);

	console.log("Move your left hand");
	var leftHand = await net.oscCollect(address, port, header, 250*10);

	console.log(leftHand, rightHand);

	parseTraining(leftHand, rightHand);
}
// collectTraining().catch(error => console.error(error));

var left = new bci.ds.Matrix(math.random([32, 4]));
var right = new bci.ds.Matrix(math.random([32, 4]));

parseTraining(left, right);

// Parse the training data
function parseTraining(left, right) {
	// CSP project the data
	var cspParams = bci.math.cspLearn(left, right);
	left = bci.math.cspProject(cspParams, left);
	right = bci.math.cspProject(cspParams, right);

	// Extract features from data windows
	// Feature vector is log of variance of each channel in window sizes of 4 with 50% window overlap
	var leftFeatures = left.windowApply(window => {
		return math.transpose(window).map(data => Math.log(math.var(data)));
	}, 4, 2, false);

	var rightFeatures = right.windowApply(window => {
		return math.transpose(window).map(data => Math.log(math.var(data)));
	}, 4, 2, false);

	// Pass feature vectures to LDA for classification
	var ldaParams = bci.math.ldaLearn(leftFeatures, rightFeatures);

	// Classify original data using LDA
	var leftEstimates = left.windowApply(window => {
		var features = math.transpose(window).map(data => Math.log(math.var(data)));
		return Math.sign(bci.math.ldaProject(ldaParams, features));
	}, 4, 2);

	var rightEstimates = right.windowApply(window => {
		var features = math.transpose(window).map(data => Math.log(math.var(data)));
		return Math.sign(bci.math.ldaProject(ldaParams, features));
	}, 4, 2);

	console.log(leftEstimates.filter(i => i == -1).length / leftEstimates.length);
	console.log(rightEstimates.filter(i => i == 1).length / rightEstimates.length);
}