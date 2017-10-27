var math = require('mathjs');
var sp = require('./signalProcessing.js');
var net = require('./networking.js');
var LDA = require('./lda.js');

// Test getBandPower()

// Generate 1 second of sample data
var sampleRate = 512;
var duration = 1;
var amplitudes = [1, 2, 4, 8];
var frequencies = [
    1, // 1 Hz, delta range
    5, // 5 Hz, theta range
    8, // 8 Hz, alpha range
    17 // 17 Hz, beta range
];

var signal = sp.generateSignal(amplitudes, frequencies, sampleRate, duration);

// Get frequency powers in signal
var size = sampleRate; // Should be power of 2, in this case size = sampleRate because it's a 1 second sample
var psd = sp.getPSD(size, signal);

var delta = sp.getBandPower(size, psd, sampleRate, 'delta');
var theta = sp.getBandPower(size, psd, sampleRate, 'theta');
var alpha = sp.getBandPower(size, psd, sampleRate, 'alpha');
var beta = sp.getBandPower(size, psd, sampleRate, 'beta');

console.log("Band power test");
console.log("delta, theta, alpha, beta");
console.log(delta, theta, alpha, beta);

// Test LDA
var set1 = [
    [0, 0],
    [1, 2],
    [2, 2],
    [1.5, 0.5]
];

var set2 = [
    [8, 8],
    [9, 10],
    [7, 8],
    [9, 9]
];

function inSet(point, set) {
    for (var i = 0; i < set.length; i++) {
        if(math.deepEqual(point, set[i])){
            return true;
        }
    }
    return false;
}

var l = new LDA(set1, set2);

console.log("LDA test");
for (var y = 12; y >= 0; y--) {
    var row = '';
    for (var x = 0; x < 13; x++) {
        var p = ''
        if (inSet([x, y], set1)) {
            p = 'A ';
        } else if (inSet([x, y], set2)) {
            p = 'B ';
        } else {
            var p = l.predict([x, y]);
            if (p >= 0) {
                p += ' ';
            }
        }
        row += p;
    }
    console.log(row);
}

// Exit before testing OSC because no OSC device currently on network
process.exit()

// Test OSC
var oscPort = 7000;
var oscAddress = '127.0.0.1';
var eegAddress = 'Person0/eeg';

net.addEEGListener(oscAddress, oscPort, eegAddress, onEEG);

var dataWindow = new sp.EEGWindow(512, 4, onWindowFull);

function onEEG(data){
  var data = data.slice(0, 4);
  dataWindow.addData(data);
}

function onWindowFull(channels){
  // Compute average alpha and beta powers over all channels
  var alpha = 0;
  var beta = 0;

  for(var i = 0; i<channels.length; i++){
    var powers = sp.getPSD(size, channels[i]);
    alpha += sp.getBandPower(size, powers, 256, 'alpha');
    beta += sp.getBandPower(size, powers, 256, 'beta');
  }
  alpha = alpha / channels.length;
  beta = beta / channels.length;

  console.log(alpha, beta);

}
