async function x() {
	var headers = await bci.network.oscHeaderScan("127.0.0.1", 12345, 100);
	console.log(headers);
}