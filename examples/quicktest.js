var bci = require('../index.js');
var net = bci.network;
var Matrix = bci.data.Matrix;
var math = require('mathjs');

async function run() {
	var events = new Matrix();

	// Collect two different events (i.e. eyes open / eyes closed)
	for (var i = 0; i < 2; i++) {
		console.log("Collecting samples for class " + i);
		await net.wait(1000);
		events.add(await net.oscCollect("127.0.0.1", 12345, "/openbci", 256 * 10));
	}

	var cspParams = bci.math.cspLearn(...events.array);
	events.map(e => bci.math.cspProject(cspParams, e));

	// Get channels 1-8 (other channels are null on our specific device)
	// events = events.map(e => e.subscript(":", "1:8"));

	// Get alpha of each channel as features
	var features = events.map(event => event.windowApply(window => {
		return math.transpose(window).map(data => Math.log(math.var(data)));
	}, 64, 32, false));

	// Pass features into LDA
	var training = features.map(f => f.subscript("1:39", ":"));
	var testing = features.map(f => f.subscript("40:79", ":"));

	var ldaParams = bci.math.ldaLearn(...training.array);
	
	var predictions = testing.map(t => t.map(features => {
		return math.sign(bci.math.ldaProject(ldaParams, features));
	}));

	// Check results
	predictions.forEach(p => console.log(math.mean(p)));
}
run().catch(error => console.error(error));