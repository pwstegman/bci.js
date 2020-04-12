import fs from 'fs';
import edfjs from 'edfjs';

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
export function loadEDF(filename){
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
