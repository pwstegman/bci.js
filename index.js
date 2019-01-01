// This file was auto generated, changes will be overwritten
// Created on Tue Jan 01 2019 12:59:58 GMT-0500 (Eastern Standard Time)
/** @module bcijs */
module.exports.csp = require('./lib/compat/csp.js');
module.exports.f1score = require('./lib/compat/f1score.js');
module.exports.lda = require('./lib/compat/lda.js');
module.exports.network = require('./lib/compat/network.js');
module.exports.signal = require('./lib/compat/signal.js');
module.exports.loadCSV = require('./lib/data/loadCSV.js');
module.exports.loadEDF = require('./lib/data/loadEDF.js');
module.exports.partition = require('./lib/data/partition.js');
module.exports.round = require('./lib/data/round.js');
module.exports.saveCSV = require('./lib/data/saveCSV.js');
module.exports.subscript = require('./lib/data/subscript.js');
module.exports.toFixed = require('./lib/data/toFixed.js');
module.exports.toTable = require('./lib/data/toTable.js');
module.exports.windowApply = require('./lib/data/windowApply.js');
module.exports.averageBandPowers = require('./lib/math/averageBandPowers.js');
module.exports.cspLearn = require('./lib/math/cspLearn.js');
module.exports.cspProject = require('./lib/math/cspProject.js');
module.exports.fastICA = require('./lib/math/fastICA.js');
module.exports.features = require('./lib/math/features.js');
module.exports.generateSignal = require('./lib/math/generateSignal.js');
module.exports.ldaLearn = require('./lib/math/ldaLearn.js');
module.exports.ldaProject = require('./lib/math/ldaProject.js');
module.exports.nextpow2 = require('./lib/math/nextpow2.js');
module.exports.psd = require('./lib/math/psd.js');
module.exports.psdBandPower = require('./lib/math/psdBandPower.js');
module.exports.signalBandPower = require('./lib/math/signalBandPower.js');
module.exports.transpose = require('./lib/math/transpose.js');
module.exports.accuracy = require('./lib/metrics/accuracy.js');
module.exports.balancedAccuracy = require('./lib/metrics/balancedAccuracy.js');
module.exports.confusionMatrix = require('./lib/metrics/confusionMatrix.js');
module.exports.f1 = require('./lib/metrics/f1.js');
module.exports.mcc = require('./lib/metrics/mcc.js');
module.exports.precision = require('./lib/metrics/precision.js');
module.exports.recall = require('./lib/metrics/recall.js');
module.exports.specificity = require('./lib/metrics/specificity.js');
module.exports.oscCollect = require('./lib/network/oscCollect.js');
module.exports.oscHeaderScan = require('./lib/network/oscHeaderScan.js');
module.exports.oscStream = require('./lib/network/oscStream.js');
module.exports.prompt = require('./lib/network/prompt.js');
module.exports.wait = require('./lib/network/wait.js');
// Additional backwards compatibility
exports.LDA = exports.lda;
exports.csp = exports.signal.CSP;
