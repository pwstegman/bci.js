var bci = require('webbci');

async function alphaBand() {
	var eeg = await bci.oscCollect("127.0.0.1", 12345, "/openbci", 256);
	var alphas = eeg.transpose().map(
		channel => bci.signalBandPower(channel, 256, 250, 'alpha')
	);

	console.log(alphas);
}
alphaBand().catch(error => console.error(error));

