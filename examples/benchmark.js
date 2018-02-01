var bci = require('../index.js');
var math = require('mathjs');

function runTests(A, B) {
	// Common spatial pattern
	var times = [];

	for (var i = 0; i < 100; i++) {
		A = math.random([250 * 60, 8]);
		B = math.random([250 * 60, 8]);

		var start = clock();
		var cspParams = bci.math.cspLearn(A, B);
		var Ap = bci.math.cspProject(cspParams, A);
		var Bp = bci.math.cspProject(cspParams, B);
		var end = clock(start);

		times.push(end);

		console.log(i + ' %');
	}

	console.log('Slowest ' + math.max(times) + ' ms');
	console.log('Fastest ' + math.min(times) + ' ms');
	console.log('Average ' + math.mean(times) + ' ms');
}

function clock(start) {
	if (!start) return process.hrtime();
	var end = process.hrtime(start);
	return end[0] * 1000 + end[1] / 1000000;
}

runTests();