var osc = require('node-osc');

/**
 * Listen for messages over OSC
 * @memberof module:webbci
 */
class oscStream {
	/**
	 * @constructor
	 * @param {number} port - Port to listen on
	 * @param {string} [address=0.0.0.0] - Address to listen on 
	 */
	constructor(port, address = "0.0.0.0") {
		this.address = address;
		this.port = port;
		this.header = header;
		this.onFuncs = {};
	}

	/**
	 * Start listening for OSC messages
	 */
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

	/**
	 * Stop listening for OSC messages
	 */
	stop() {
		this.server.kill();
	}

	/**
	 * Call a callback function when data containing a specified OSC header is seen
	 * @param {string} header - The OSC header
	 * @param {requestCallback} callback - Called with the OSC data passed as the parameter
	 */
	on(header, callback) {
		this.onFuncs[header] = callback;
	}
}

module.exports = oscStream;