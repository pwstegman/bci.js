var osc = require('node-osc');

/**
 * Listen for messages over OSC
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 */
class oscStream {
	/**
	 * @constructor
	 * @param {string} address - Address to listen on
	 * @param {number} port - Port to listen on
	 */
	constructor(address, port) {
		this.address = address;
		this.port = port;
		this.onFuncs = {};
	}

	/**
	 * Start listening for OSC messages
	 */
	start() {
		this.server = new osc.Server(this.port, this.address);

		var parent = this;
		this.server.on("message", function (msg, rinfo) {
			var header = msg[0];
			var data = msg.slice(1);

			if (header in parent.onFuncs) {
				parent.onFuncs[header](data);
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