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

	await bci.data.saveCSV(events.array[0], "left.csv");
	await bci.data.saveCSV(events.array[1], "right.csv");
	console.log("Saved");

	var cspParams = bci.math.cspLearn(...events.array);
	events = events.map(e => bci.math.cspProject(cspParams, e));
	
	var features = events.map(event => event.windowApply(window => {
		return math.transpose(window).map(channel => math.log(math.var(channel)));
	}, 64, 32, false));

	var ldaParams = bci.math.ldaLearn(features.array[0].array, features.array[1].array);

	while(true){
		var data = await net.oscCollect("127.0.0.1", 12345, "/openbci", 64);
		data = bci.math.cspProject(cspParams, data.array);
		var fs = math.transpose(data.array).map(channel => math.log(math.var(channel)));
		var r = bci.math.ldaProject(ldaParams, fs);
		console.log(r);
	}
}
run().catch(error => console.error(error));