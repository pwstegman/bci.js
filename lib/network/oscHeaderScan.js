/**
 * @memberof module:webbci.network
 */

var osc = require('node-osc');

/**
 * Scan for OSC headers on a port and address
 * @param {any} address - OSC address
 * @param {any} port - OSC port
 * @param {any} duration - Duration of scan in milliseconds
 */
function oscHeaderScan(address, port, duration, callback) {
	var server = new osc.Server(port, address);

	var headers = new Set();
	var start = Date.now();

	server.on("message", function (msg, rinfo) {
		var header = msg[0];
		headers.add(header);

		var time = Date.now();

		if (time - start >= duration) {
			server.kill();
			callback(true, [...headers]);
		}
	});
}

module.exports = oscHeaderScan;