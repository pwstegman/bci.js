"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _averageBandPowers = require("./compat/averageBandPowers");

Object.keys(_averageBandPowers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _averageBandPowers[key];
    }
  });
});

var _csp = require("./compat/csp");

Object.keys(_csp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _csp[key];
    }
  });
});

var _f1score = require("./compat/f1score");

Object.keys(_f1score).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _f1score[key];
    }
  });
});

var _lda = require("./compat/lda");

Object.keys(_lda).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lda[key];
    }
  });
});

var _network = require("./compat/network");

Object.keys(_network).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _network[key];
    }
  });
});

var _psd = require("./compat/psd");

Object.keys(_psd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _psd[key];
    }
  });
});

var _psdBandPower = require("./compat/psdBandPower");

Object.keys(_psdBandPower).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _psdBandPower[key];
    }
  });
});

var _signal = require("./compat/signal");

Object.keys(_signal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _signal[key];
    }
  });
});

var _signalBandPower = require("./compat/signalBandPower");

Object.keys(_signalBandPower).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _signalBandPower[key];
    }
  });
});

var _loadCSV = require("./data/loadCSV");

Object.keys(_loadCSV).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loadCSV[key];
    }
  });
});

var _loadEDF = require("./data/loadEDF");

Object.keys(_loadEDF).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loadEDF[key];
    }
  });
});

var _partition = require("./data/partition");

Object.keys(_partition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _partition[key];
    }
  });
});

var _round = require("./data/round");

Object.keys(_round).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _round[key];
    }
  });
});

var _saveCSV = require("./data/saveCSV");

Object.keys(_saveCSV).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _saveCSV[key];
    }
  });
});

var _subscript = require("./data/subscript");

Object.keys(_subscript).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _subscript[key];
    }
  });
});

var _toFixed = require("./data/toFixed");

Object.keys(_toFixed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toFixed[key];
    }
  });
});

var _toTable = require("./data/toTable");

Object.keys(_toTable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toTable[key];
    }
  });
});

var _windowApply = require("./data/windowApply");

Object.keys(_windowApply).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _windowApply[key];
    }
  });
});

var _bandpower = require("./math/bandpower");

Object.keys(_bandpower).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _bandpower[key];
    }
  });
});

var _cspLearn = require("./math/cspLearn");

Object.keys(_cspLearn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cspLearn[key];
    }
  });
});

var _cspProject = require("./math/cspProject");

Object.keys(_cspProject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cspProject[key];
    }
  });
});

var _fastICA = require("./math/fastICA");

Object.keys(_fastICA).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fastICA[key];
    }
  });
});

var _features = require("./math/features");

Object.keys(_features).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _features[key];
    }
  });
});

var _generateSignal = require("./math/generateSignal");

Object.keys(_generateSignal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _generateSignal[key];
    }
  });
});

var _ldaClassify = require("./math/ldaClassify");

Object.keys(_ldaClassify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ldaClassify[key];
    }
  });
});

var _ldaLearn = require("./math/ldaLearn");

Object.keys(_ldaLearn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ldaLearn[key];
    }
  });
});

var _ldaProject = require("./math/ldaProject");

Object.keys(_ldaProject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ldaProject[key];
    }
  });
});

var _nextpow = require("./math/nextpow2");

Object.keys(_nextpow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _nextpow[key];
    }
  });
});

var _periodogram = require("./math/periodogram");

Object.keys(_periodogram).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _periodogram[key];
    }
  });
});

var _transpose = require("./math/transpose");

Object.keys(_transpose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transpose[key];
    }
  });
});

var _accuracy = require("./metrics/accuracy");

Object.keys(_accuracy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _accuracy[key];
    }
  });
});

var _balancedAccuracy = require("./metrics/balancedAccuracy");

Object.keys(_balancedAccuracy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _balancedAccuracy[key];
    }
  });
});

var _confusionMatrix = require("./metrics/confusionMatrix");

Object.keys(_confusionMatrix).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _confusionMatrix[key];
    }
  });
});

var _f = require("./metrics/f1");

Object.keys(_f).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _f[key];
    }
  });
});

var _mcc = require("./metrics/mcc");

Object.keys(_mcc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mcc[key];
    }
  });
});

var _precision = require("./metrics/precision");

Object.keys(_precision).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _precision[key];
    }
  });
});

var _recall = require("./metrics/recall");

Object.keys(_recall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _recall[key];
    }
  });
});

var _specificity = require("./metrics/specificity");

Object.keys(_specificity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _specificity[key];
    }
  });
});

var _oscCollect = require("./network/oscCollect");

Object.keys(_oscCollect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _oscCollect[key];
    }
  });
});

var _oscHeaderScan = require("./network/oscHeaderScan");

Object.keys(_oscHeaderScan).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _oscHeaderScan[key];
    }
  });
});

var _oscStream = require("./network/oscStream");

Object.keys(_oscStream).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _oscStream[key];
    }
  });
});

var _prompt = require("./network/prompt");

Object.keys(_prompt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _prompt[key];
    }
  });
});

var _wait = require("./network/wait");

Object.keys(_wait).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _wait[key];
    }
  });
});