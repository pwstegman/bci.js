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
	var rightHand = await net.oscCollect(address, port, header, 250*10);
	console.log("Move your left hand");
	var leftHand = await net.oscCollect(address, port, header, 250*10);
	console.log();

	parseTraining(leftHand, rightHand);
}
collectTraining().catch(error => console.error(error));

// Parse the training data
function parseTraining(left, right) {
	// Get all samples, and only channels 1 through 4
	// Subscript uses matlab style syntax (arrays start at 1, indicies are inclusive)
	left = left.subscript(":", "1:4");
	right = right.subscript(":", "1:4");

	var cspParams = bci.math.cspLearn(left, right);

	var leftP = bci.math.cspProject(cspParams, left);
	var rightP = bci.math.cspProject(cspParams, right);

	// Get the log of variance of each channel
	var leftFeatures = leftP.transpose().array.map(data => Math.log(math.var(data)));
	var rightFeatures = rightP.transpose().array.map(data => Math.log(math.var(data)));

	console.log(leftFeatures);
	console.log(rightFeatures);
	
}