import osc from 'node-osc';

/**
 * @memberof module:bcijs.network
 */

/**
 * Scan for OSC headers on a port and address
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @param {any} address - OSC address
 * @param {any} port - OSC port
 * @param {any} duration - Duration of scan in milliseconds
 * @returns {Promise} Resolves with an array of found headers
 */
export function oscHeaderScan(address, port, duration) {
	return new Promise(function (resolve, reject) {
		var server = new osc.Server(port, address);

		var headers = new Set();

		server.on("message", function (msg, rinfo) {
			var header = msg[0];
			headers.add(header);
		});

		setTimeout(() => {
			server.kill();
			resolve([...headers]);
		}, duration);
	});
}
