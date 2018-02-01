/**
 * @memberof module:webbci.network
 */

var osc = require('node-osc');
var Matrix = require('../data/Matrix');

/**
 * Collect a set number of samples over OSC
 * @param {string} address - OSC address
 * @param {number} port - OSC port
 * @param {string} header - OSC header, can be found by scanning with oscHeaderScan if unknown
 * @param {number} samples - The number of samples to collect
 */
function oscCollect(address, port, header, samples) {
	return new Promise(function (resolve, reject) {
		var data = new Matrix();
		data.setRows("samples");
		data.setCols("channels");

		if (samples == 0) {
			resolve(data);
			return;
		}

		var server = new osc.Server(port, address);

		server.on("message", function (msg, rinfo) {
			if (msg[0] == header) {
				data.push(msg.slice(1));

				if (data.length > samples) {
					server.kill();
					reject("More OSC samples seen than expected");
				}else if (data.length == samples) {
					server.kill();
					resolve(data);
					data = [];
				}
			}
		});
	});
}

module.exports = oscCollect;