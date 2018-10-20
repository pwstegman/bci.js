const fs = require('fs');
const edfjs = require('edfjs');
const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/matrix'));

/**
 * Load data from an EDF file
 * <p>This method is exclusive to Node.js</p>
 * @param {string} filename - Path to the EDF file
 * @returns an object with the following values: {subject:string, recording:string, num_channels:number, starttime:string, channel_labels:string[], samplerates:number[], physical_dimensions:number[], samples:number[][]}
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