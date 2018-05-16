var bci = require('../index.js');

async function collect(){
    // View what OSC headers are being broadcasted over the next 2 seconds
    console.log('Scanning for OSC headers');
    var headers = await bci.oscHeaderScan('0.0.0.0', 7000, 2000);

    console.log('OSC Headers:');
    if(headers.length == 0){
        console.log("No headers found");
        return;
    }
    headers.forEach((header, index) => console.log(index + ': ' + header));

    var headerNumber = await bci.prompt('Enter the number of the header to read data from: ');
    var header = headers[headerNumber];
    console.log("Selected header '" + header + "'");

    // Collect a set of 8 samples
    var data = await bci.oscCollect('0.0.0.0', '7000', header, 8);
    console.log(data);
}
collect().catch(error => console.log(error));