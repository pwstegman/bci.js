/**
 * @memberof module:webbci.network
 */

var osc = require('node-osc');

class oscStream {
	constructor(port, address = "0.0.0.0") {
		this.address = address;
		this.port = port;
		this.header = header;
		this.onFuncs = {};
	}

	start() {
		this.server = new osc.Server(this.port, this.address);

		this.server.on("message", function (msg, rinfo) {
			var header = msg[0];
			var data = msg.slice(1);

			if (header in this.onFuncs) {
				this.onFuncs(data);
			}
		});
	}

	stop() {
		this.server.kill();
	}

	on(header, callback) {
		this.onFuncs[header] = callback;
	}
}

module.exports = oscStream;