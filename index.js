/**
 * A module for BCI design and EEG signal processing.
 * @module webbci
 */

exports.signal = require('./lib/signal.js');
exports.network = require('./lib/network.js');
exports.LDA = require('./lib/lda.js');

// backwards compatibility
exports.lda = exports.LDA;
exports.csp = exports.signal.CSP;