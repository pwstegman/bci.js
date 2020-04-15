"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadEDF = loadEDF;

var _fs = _interopRequireDefault(require("fs"));

var _edfjs = _interopRequireDefault(require("edfjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load data from an EDF file
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @param {string} filename - Path to the EDF file
 * @returns {Object} An object with the following parameters:
 * <br>
 * <br> subject [string] - The name of the subject
 * <br> recording [string] - The name of the recording
 * <br> start_time [string] - The start time as a date time string
 * <br> channels [Array] - An array of channel objects
 * <br>
 * <br> A channel object has the following parameters:
 * <br>
 * <br> label [string] - The label for the channel
 * <br> sample_rate [number] - The sample rate for the channel
 * <br> physical_dimension [string] - The units for each channel (ex: uV)
 * <br> samples [number[]] - An array of samples from the channel 
 */
function loadEDF(filename) {
  var file = _fs.default.readFileSync(filename);

  var edf = _edfjs.default.EDF();

  edf.read_buffer(file.buffer, false);
  var subject = edf.pid;
  var recording = edf.rid;
  var starttime = edf.startdatetime;
  var channels = edf.channels.map(function (channel) {
    var samples = new Array(channel.blob.length);

    for (var i = 0; i < channel.blob.length; i++) {
      samples[i] = channel.blob[i];
    }

    return {
      'label': channel.label,
      'sample_rate': channel.sampling_rate,
      'physical_dimension': channel.physical_dimension,
      'samples': samples
    };
  });
  return {
    subject: subject,
    recording: recording,
    start_time: starttime,
    channels: channels
  };
}