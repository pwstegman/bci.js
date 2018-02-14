var bci = require('../index.js');
var net = bci.network;
var Matrix = bci.data.Matrix;
var math = require('mathjs');

async function run() {
	var events = new Matrix();

	for (var i = 0; i < 2; i++) {
		console.log("Collecting samples for class " + i);
		await net.wait(500);
		events.add(await net.oscCollect("127.0.0.1", 12345, "/openbci", 256 * 30));
	}

	var cspParams = bci.math.cspLearn(...events.array);
	events = events.map(e => bci.math.cspProject(cspParams, e));

	/* TODO: Allow passing of strings like 'logvar' */
	var features = events.map(event => event.windowApply(bci.math.features.logvar, 64, 32, false));

	// Pass features into LDA
	var training = features.map(f => f.subscript("1:39", ":"));
	var testing = features.map(f => f.subscript("40:79", ":"));

	var ldaParams = bci.math.ldaLearn(training.array[0].array, training.array[1].array);

	var predictions = testing.map(t => t.map(features => {
		return math.sign(bci.math.ldaProject(ldaParams, features));
	}));

	// Check results
	predictions.array.forEach(p => console.log(math.mean(p.array)));
}
run().catch(error => console.error(error));