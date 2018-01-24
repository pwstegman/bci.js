var bci = require('../lib/index.js');
var net = bci.network;

// OSC settings
var address = "127.0.0.1";
var port = 7000;
var header = "Person0/eeg";

// Collect training data
async function collectTraining() {
	console.log("Move your right hand. Data collection starts in 3 seconds.");
	await net.wait(3000);
	console.log("Collecting...");
	var rightHand = await net.oscCollect(address, port, header, 100);
	console.log("Complete");

	console.log("Move your left hand. Data collection starts in 3 seconds.")
	await net.wait(3000);
	var leftHand = await net.oscCollect(address, port, header, 100);
	console.log("Complete");

	parseTraining();
}
collectTraining();

// Parse the training data
function parseTraining() {
	console.log("TODO");
}