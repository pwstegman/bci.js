"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multitaper = multitaper;

var _dpss = require("./dpss");

var _periodogram = require("./periodogram");

/**
 * Combined PSDs with weights applied to each tapered PSD
 * @private
 * @param {object[]} psds 
 * @param {number[]} weights 
 * @returns {number[]} Average PSD
 */
function weightedTapers(psds, weights) {
  // Store the average
  var avg = new Array(psds[0].estimates.length).fill(0); // Weighted sum

  var sum_weights = 0;

  for (var p = 0; p < psds.length; p++) {
    sum_weights += weights[p];

    for (var f = 0; f < psds[p].estimates.length; f++) {
      avg[f] += psds[p].estimates[f] * weights[p];
    }
  } // Divide by the sum to get weighted average


  for (var _f = 0; _f < avg.length; _f++) {
    avg[_f] /= sum_weights;
  }

  return avg;
}
/**
 * Combined PSDs with weights applied to each tapered PSD and each frequency bin
 * @private
 * @param {object[]} psds 
 * @param {number[][]} weights 
 * @returns {number[]} Average PSD
 */


function weightedTapersFrequencies(psds, weights) {
  // Store the average
  var avg = new Array(psds[0].estimates.length).fill(0);
  var num_frequencies = psds[0].estimates.length; // Weighted sum

  var weight_sums = new Array(num_frequencies).fill(0);

  for (var p = 0; p < psds.length; p++) {
    for (var f = 0; f < num_frequencies; f++) {
      avg[f] += psds[p].estimates[f] * weights[p][f];
      weight_sums[f] += weights[p][f];
    }
  } // Divide by the sums to get an average


  for (var _f2 = 0; _f2 < num_frequencies; _f2++) {
    avg[_f2] /= weight_sums[_f2];
  }

  return avg;
}
/**
 * Calculate weights at the taper and frequency level for adaptive multitaper
 * @param {number[]} spectrum - Current estimate of the spectrum
 * @param {number[]} eigenvalues - Eigenvalues of tapers
 * @param {number} variance - Variance of signal
 * @return {number[][]} The weights
 */


function calculateAdaptiveWeights(spectrum, eigenvalues, variance) {
  // Calculate weights b(k, f)^2*eigenvalues(k), See: Percival and Walden, 1993, p.368
  var weights = [];

  for (var i = 0; i < eigenvalues.length; i++) {
    var f_weights = [];

    for (var j = 0; j < spectrum.length; j++) {
      f_weights.push(Math.pow(spectrum[j] / (spectrum[j] * eigenvalues[i] + (1 - eigenvalues[i]) * variance), 2) * eigenvalues[i]);
    }

    weights.push(f_weights);
  }

  return weights;
}

function log(verbose, message) {
  if (verbose) console.log(message);
}
/**
 * Estimate the power spectral density using the multitaper method
 * @param {number[]} signal - The signal
 * @param {number} sample_rate - The sample rate
 * @param {object} options
 * @param {number} [options.nw=4] - The time-halfbandwidth. Default is 4.
 */


function multitaper(signal, sample_rate, options) {
  var _Object$assign = Object.assign({
    nw: 4,
    k: null,
    method: 'adaptive',
    max_iterations: 100,
    tolerance: 1e-10,
    verbose: false
  }, options),
      nw = _Object$assign.nw,
      k = _Object$assign.k,
      method = _Object$assign.method,
      max_iterations = _Object$assign.max_iterations,
      tolerance = _Object$assign.tolerance,
      verbose = _Object$assign.verbose; // Default k (number of tapers)


  if (k === null) k = Math.floor(nw * 2 - 1);
  log(verbose, "Using ".concat(k, " tapers with ").concat(method, " weights")); // Compute the DPSSs

  var sequences = (0, _dpss.dpss)(signal.length, nw, k);
  var tapers = sequences.vectors;
  var eigenvalues = sequences.values; // Compute periodograms

  var psds = tapers.map(function (taper) {
    return (0, _periodogram.periodogram)(signal, sample_rate, {
      window: taper
    });
  }); // Weighted average estimates

  var frequencies = psds[0].frequencies;
  var estimates;

  if (method == 'unity') {
    var weights = new Array(psds.length).fill(1);
    estimates = weightedTapers(psds, weights);
  } else if (method == 'eigen') {
    var _weights = eigenvalues;
    estimates = weightedTapers(psds, _weights);
  } else if (method == 'adaptive') {
    // Calculate the initial estimate with first two tapers
    estimates = weightedTapers(psds.slice(0, 2), eigenvalues.slice(0, 2)); // Calculate variance

    var variance = 0;

    for (var i = 0; i < signal.length; i++) {
      variance += Math.pow(signal[i], 2);
    }

    variance /= signal.length; // Iterate until convergence

    var iteration = -1;
    var max_delta = -1;

    for (var _i = 0; _i < max_iterations; _i++) {
      // Calculate weights
      var _weights2 = calculateAdaptiveWeights(estimates, eigenvalues, variance); // Re-estimate the spectrum


      var new_estimates = weightedTapersFrequencies(psds, _weights2); // Check if converged

      max_delta = 0;

      for (var _i2 = 0; _i2 < estimates.length; _i2++) {
        var delta = Math.abs(estimates[_i2] - new_estimates[_i2]);
        if (delta > max_delta) max_delta = delta;
      } // Update spectrum


      estimates = new_estimates; // Complete if converged

      if (max_delta < tolerance) {
        iteration = _i;
        log(verbose, "Converged after completing iteration ".concat(_i + 1));
        break;
      }

      ;
    }

    if (iteration == -1) {
      log(verbose, "Reached max iterations of ".concat(max_iterations, " with a maximum delta of ").concat(max_delta));
    }
  } else {
    throw new Error('Unknown method');
  }

  return {
    estimates: estimates,
    frequencies: frequencies
  };
}