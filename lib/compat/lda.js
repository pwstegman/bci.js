"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lda = exports.LDA = LDA;

var _mathjs = require("mathjs");

var _pwStat = _interopRequireDefault(require("pw-stat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An LDA object
 * @deprecated since version 1.1
 * @name LDA
 * @memberof module:bcijs
 * @constructor
 * @param {number[][]} class1 - Data set for class 1, rows are samples, columns are variables
 * @param {number[][]} class2 - Data set for class 2, rows are samples, columns are variables
 */
function LDA() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  // Compute pairwise LDA classes (needed for multiclass LDA)
  if (classes.length < 2) {
    throw new Error('Please pass at least 2 classes');
  }

  var numberOfPairs = classes.length * (classes.length - 1) / 2;
  var pair1 = 0;
  var pair2 = 1;
  var pairs = new Array(numberOfPairs);

  for (var i = 0; i < numberOfPairs; i++) {
    pairs[i] = computeLdaParams(classes[pair1], classes[pair2], pair1, pair2);
    pair2++;

    if (pair2 == classes.length) {
      pair1++;
      pair2 = pair1 + 1;
    }
  }

  this.pairs = pairs;
  this.numberOfClasses = classes.length;
}

function computeLdaParams(class1, class2, class1id, class2id) {
  var mu1 = (0, _mathjs.transpose)(_pwStat.default.mean(class1));
  var mu2 = (0, _mathjs.transpose)(_pwStat.default.mean(class2));
  var pooledCov = (0, _mathjs.add)(_pwStat.default.cov(class1), _pwStat.default.cov(class2));
  var theta = (0, _mathjs.multiply)((0, _mathjs.inv)(pooledCov), (0, _mathjs.subtract)(mu2, mu1));
  var b = (0, _mathjs.multiply)(-1, (0, _mathjs.transpose)(theta), (0, _mathjs.add)(mu1, mu2), 1 / 2);
  return {
    theta: theta,
    b: b,
    class1id: class1id,
    class2id: class2id
  };
}
/**
 * Predict the class of an unknown data point
 * @name project
 * @memberof module:bcijs.LDA
 * @function
 * @param {number[]} point - The data point to be classified.
 * @returns {number} value less than 0 if predicted to be in class 1, 0 if exactly inbetween, greater than 0 if class 2
 */


LDA.prototype.project = function (point) {
  if (this.pairs.length != 1) {
    throw new Error('LDA project currently only supports 2 classes. LDA classify can be used to perform multiclass classification.');
  }

  return projectPoint(point, this.pairs[0].theta, this.pairs[0].b);
};

function projectPoint(point, theta, b) {
  return (0, _mathjs.add)((0, _mathjs.multiply)(point, theta), b);
}
/**
 * Classify an unknown point. Uses a pairwise voting system in the event of multiclass classification.
 * @param {number[]} point - The data point to be classified.
 * @returns {number} Returns the predicted class. Class numbers range from 0 to (number_of_classes - 1).
 */


LDA.prototype.classify = function (point) {
  // In the event of a binary classifier, skip the voting process
  if (this.numberOfClasses == 2) {
    return projectPoint(point, this.pairs[0].theta, this.pairs[0].b) <= 0 ? 0 : 1;
  } // Start each class with 0 votes


  var votes = new Array(this.numberOfClasses);

  for (var i = 0; i < this.numberOfClasses; i++) {
    votes[i] = 0;
  } // Allow each pair to cast a vote


  for (var _i = 0; _i < this.pairs.length; _i++) {
    var params = this.pairs[_i];
    var projection = projectPoint(point, params.theta, params.b);

    if (projection <= 0) {
      votes[params.class1id]++;
    } else {
      votes[params.class2id]++;
    }
  } // Find the winning class


  var classificaion = 0;
  var maxVotes = votes[0];

  for (var _i2 = 1; _i2 < votes.length; _i2++) {
    if (votes[_i2] > maxVotes) {
      classificaion = _i2;
      maxVotes = votes[_i2];
    }
  }

  return classificaion;
};