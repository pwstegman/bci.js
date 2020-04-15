"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.network = void 0;

var _nodeOsc = _interopRequireDefault(require("node-osc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The network operations for bcijs
 * <p>These methods are exclusive to Node.js</p>
 * @deprecated since version 1.1
 * @namespace network
 * @memberof module:bcijs
 */

/**
 * Calls callback when EEG data is received over the network.
 * @memberof module:bcijs.network
 * @param {string} oscAddress - The address of the OSC server. For example: 127.0.0.1.
 * @param {number} oscPort - The port of the OSC server.
 * @param {string} eegAddress - The OSC header for the EEG data. For example: Person0/eeg.
 * @param {requestCallback} callback - Called when EEG data is received. 
 */
var network = {};
exports.network = network;

network.addEEGListener = function (oscAddress, oscPort, eegAddress, callback) {
  var oscServer = new _nodeOsc.default.Server(oscPort, oscAddress);
  oscServer.on("message", function (msg, rinfo) {
    if (msg[0] == eegAddress) {
      callback(msg.slice(1));
    }
  });
};