var bci = require('../lib/index.js');
var net = bci.network;

// OSC settings
var address = "127.0.0.1";
var port = 7000;
var header = "Person0/eeg";

// Collect training data
var rightHand;
var leftHand;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

console.log("Move your right hand. Data collection starts in 3 seconds");

wait(3000)
	.then(() => net.oscCollect(address, port, header, 3, 1))
	.then(data => {
		rightHand = data;
		console.log("Move your left hand. Data collection starts in 3 seconds");
		return wait(3000);
	})
	.then(() => net.oscCollect(address, port, header, 3, 1))
	.then(data => {
		console.log(rightHand);
		console.log(data);
	});
	