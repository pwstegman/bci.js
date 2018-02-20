/**
 * The network operations for webbci
 * @namespace network
 * @memberof module:webbci
 */

var osc = require('node-osc');

/**
 * Calls callback when EEG data is received over the network.
 * @memberof module:webbci.network
 * @param {string} oscAddress - The address of the OSC server. For example: 127.0.0.1.
 * @param {number} oscPort - The port of the OSC server.
 * @param {string} eegAddress - The OSC header for the EEG data. For example: Person0/eeg.
 * @param {requestCallback} callback - Called when EEG data is received. 
 */
function addEEGListener(oscAddress, oscPort, eegAddress, callback){
  var oscServer = new osc.Server(oscPort, oscAddress);

  oscServer.on("message", function (msg, rinfo) {
        if(msg[0] == eegAddress){
          callback(msg.slice(1));
        }
  });
}

exports.addEEGListener = addEEGListener;
