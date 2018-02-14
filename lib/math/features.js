var math = require('mathjs');
var sbp = require('./signalBandPower.js');

module.exports.logvar = window => {
	return math.transpose(window).map(channel => math.log(math.var(channel)));
}

module.exports.rms = window => {
	return math.transpose(window).map(channel => math.sqrt(math.mean(math.square(channel))));
}

/* TODO: Add features with bands */