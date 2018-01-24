var wbci = require('webbci');

// OSC settings
var address = "127.0.0.1";
var port = 12345;
var header = "person0/eeg";

// Step 1: Collect training data
var prompts = [
	{
		delay: 3000,
		message: "Move your left hand"
	},

	{
		delay: 3000,
		message: "Move your right hand"
	}
];
oscPrompt(address, port, header, prompts, "channels", onTraining);

// Step 2: Process training data
function onTraining(data) {
	console.log("Processing training data");

	var cspParams = cspLearn(data[0], data[1]);

	var A = cspProject(cspParams, data[0]);
	var B = cspProject(cspParams, data[1]);

	var fA = [];
	for (var i = 0; i < A[0].length; )
}