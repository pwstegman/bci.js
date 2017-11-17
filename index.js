/**
 * A module for BCI design and EEG signal processing.
 * @module webbci
 */

/** webbci.signal - Signal processing */
exports.signal = require('./lib/signal.js');

/** webbci.network - Retrieve EEG data over OSC */
exports.network = require('./lib/network.js');

var pierce = require('pierce');

/** webbci.lda - Use linear discriminant analysis to classify feature vectors */
exports.lda = pierce.lda;

/** webbci.csp - Compute the common spatial pattern for given signals */
exports.csp = pierce.csp;