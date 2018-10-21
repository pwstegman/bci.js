const fs = require('fs');
const edfjs = require('edfjs');
const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/matrix'));

/**
 * An object containing EDF file data
 * @typedef {Object} EDFData
 * @property {string} subject - The name of the subject
 * @property {string} recording - The name of the recording
 * @property {number} num_channels - The number of channels
 * @property {string} starttime - The starttime as a date time string
 * @property {string[]} channel_labels - The label for each channel
 * @property {number[]} samplerates - The sample rate for each channel
 * @property {string[]} physical_dimensions - The units for each channel (ex: uV)
 * @property {number[][]} samples - The data samples where columns are channels and rows are samples 
 */

/**
 * Load data from an EDF file
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @param {string} filename - Path to the EDF file
 * @returns {EDFData} The data from the EDF file
 */
function loadEDF(filename){
    let file = fs.readFileSync(filename);
    let edf = edfjs.EDF();
    edf.read_buffer(file.buffer, false);

    let subject = edf.pid;
    let recording = edf.rid;
    let num_channels = edf.num_channels;
    let starttime = edf.startdatetime;
    let samplerates = edf.channels.map(channel => channel.sampling_rate);
    let labels = edf.channels.map(channel => channel.label);
    let physical_dimensions = edf.channels.map(channel => channel.physical_dimension);

    let data = edf.channels.map(channel => Array.prototype.slice.call(channel.blob));
    data = math.transpose(data);
    return {
        subject: subject,
        recording: recording,
        num_channels: num_channels,
        starttime: starttime,
        channel_labels: labels,
        samplerates: samplerates,
        physical_dimensions: physical_dimensions,
        samples: data
    };
}
module.exports = loadEDF;