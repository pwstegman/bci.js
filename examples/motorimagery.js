var bci = require('webbci');
var math = require('mathjs');

async function run() {
	var events = new bci.Matrix();

	// Collect two different motor imagery classes
	for (var i = 0; i < 2; i++) {
		console.log("Collecting samples for class " + i);
		await bci.wait(500);
		events.add(await bci.oscCollect("127.0.0.1", 12345, "/openbci", 256 * 30));
	}

	// Run CSP
	var cspParams = bci.cspLearn(...events.array);
	events = events.map(e => bci.cspProject(cspParams, e));

	// Use the log of variance of channels as features
	var features = events.map(event => event.windowApply(bci.features.logvar, 64, 32, false));

	// Split into training and testing sets
	var training = features.map(f => f.subscript("1:39", ":"));
	var testing = features.map(f => f.subscript("40:79", ":"));

	// Run LDA classifier
	var ldaParams = bci.math.ldaLearn(training.array[0].array, training.array[1].array);
	var predictions = testing.map(t => t.map(features => {
		return math.sign(bci.ldaProject(ldaParams, features));
	}));

	// Check results
	predictions.toArray().forEach(p => console.log(math.mean(p.toArray())));
}
run().catch(error => console.error(error));