const fs = require('fs');
const edfjs = require('edfjs');
const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/function/matrix'));

/**
 * Load data from an EDF file
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @param {string} filename - Path to the EDF file
 * @returns {Object} Data from the EDF file, contains the following parameters:
 * <br> {string} subject - The name of the subject
 * <br> {string} recording - The name of the recording
 * <br> {number} num_channels - The number of channels
 * <br> {string} starttime - The starttime as a date time string
 * <br> {string[]} channel_labels - The label for each channel
 * <br> {number[]} samplerates - The sample rate for each channel
 * <br> {string[]} physical_dimensions - The units for each channel (ex: uV)
 * <br> {number[][]} samples - The data samples where columns are channels and rows are samples 
 */
function loadEDF(filename){
    let file = fs.readFileSync(filename);
    let edf = edfjs.EDF();
    edf.read_buffer(file.buffer, false);

    let subject = edf.pid;
    let recording = edf.rid;
    let starttime = edf.startdatetime;

    let channels = edf.channels.map(channel => {

        let samples = new Array(channel.blob.length);
        for(let i = 0; i < channel.blob.length; i++){
            samples[i] = channel.blob[i];
        }

        return {
            'label': channel.label,
            'sample_rate': channel.sampling_rate,
            'physical_dimension': channel.physical_dimension,
            'samples': samples
        }
    });

    return {
        subject: subject,
        recording: recording,
        start_time: starttime,
        channels: channels,
    };
}
module.exports = loadEDF;