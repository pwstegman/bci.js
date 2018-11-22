const bci = require('../../index.js'); // bcijs

// Listen on all interfaces over port 7000
let osc = new bci.oscStream('0.0.0.0', 7000);

// Callback when OSC data with header 'Person0/eeg' is seen
osc.on('Person0/eeg', data => {
    console.log(data);
});

// Start listening
osc.start();
