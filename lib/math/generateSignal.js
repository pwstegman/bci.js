"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSignal = generateSignal;

var _mathjs = require("mathjs");

/**
 * Generate a signal with the given frequencies and their amplitudes.
 * @memberof module:bcijs
 * @param {number[]} amplitudes - The amplitudes of each frequency.
 * @param {number[]} frequencies - The frequencies.
 * @param {number} sampleRate - Sample rate of the signal in Hz.
 * @param {number} duration - Duration of the signal in seconds.
 * @returns {number[]} The generated signal.
 * @example
 * let amplitudes = [4, 8];
 * let frequencies = [10, 20]; // 10 Hz (alpha), 20 Hz (beta)
 * let sampleRate = 512; // Hz
 * let duration = 1; // Seconds
 * 
 * let signal = bci.generateSignal(amplitudes, frequencies, sampleRate, duration);
 */
function generateSignal(amplitudes, frequencies, sampleRate, duration) {
  var x = (0, _mathjs.range)(0, duration, 1 / sampleRate);
  var signal = (0, _mathjs.zeros)(x.size()[0]);

  for (var i = 0; i < amplitudes.length; i++) {
    signal = (0, _mathjs.add)(signal, (0, _mathjs.multiply)(amplitudes[i], (0, _mathjs.sin)((0, _mathjs.multiply)(2 * Math.PI * frequencies[i], x))));
  }

  return signal.toArray();
}