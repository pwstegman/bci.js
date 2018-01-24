var osc = require('node-osc');

/**
 * Collect a set number of samples over OSC
 * @param {string} address - OSC address
 * @param {number} port - OSC port
 * @param {string} header - OSC header, can be found by scanning with oscHeaderScan if unknown
 * @param {number} samples - The number of samples to collect
 * @param {requestCallback} callback - Called with array of samples when specified number have been collected
 */
function oscCollect(address, port, header, samples, iterations, callback) {
	var server = new osc.Server(port, address);

	var data = [];
	var runs = 0;

	server.on("message", function (msg, rinfo) {
		if (msg[0] == header) {
			data.push(msg.slice(1));

			if (data.length > samples || (runs > iterations && iterations >= 0)) {
				console.error("More OSC samples seen than expected");
				server.kill();
				return;
			}

			if (data.length == samples) {
				runs += 1;
				if (runs == iterations) {
					server.kill();
				}

				callback(data);
				data = [];
			}
		}
	});
}

module.exports = oscCollect;