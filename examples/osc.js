var wbci = require('webbci');
var net = wbci.network;
var ws = wbci.signal;

// OSC properties
var oscPort = 7000;
var oscAddress = '127.0.0.1';
var eegAddress = 'Person0/eeg';

// Listen for EEG data
net.addEEGListener(oscAddress, oscPort, eegAddress, onEEG);

var windowSize = 512;
var numChannels = 4;
var sampleRate = 256;

var dataWindow = new ws.EEGWindow(windowSize, numChannels, onWindowFull);
function onEEG(data) {
	dataWindow.addData(data);
}

function onWindowFull(channels) {
	// Compute sum of alpha and beta powers over all channels
	var alpha = 0;
	var beta = 0;

	for (var i = 0; i < channels.length; i++) {
		var powers = ws.getPSD(windowSize, channels[i]);
		alpha += ws.getBandPower(windowSize, powers, sampleRate, 'alpha');
		beta += ws.getBandPower(windowSize, powers, sampleRate, 'beta');
	}

	var concentration = beta / alpha;

	console.log(concentration);
}