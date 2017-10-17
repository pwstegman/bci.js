var math = require('mathjs');

// A module based on https://github.com/pwstegman/lda

function cov(a){
  // Thanks to https://math.stackexchange.com/questions/561340/how-to-calculate-the-covariance-matrix
  var n = a.size()[0];
  var x = math.subtract(a, math.multiply((1 / n), math.ones(n, 1), math.ones(1, n), a));
  var y = math.multiply(math.transpose(x), x);
  return math.multiply(1 / (n-1), y);
}

function mean(a){
  // Compute the mean of each column
  var result = math.zeros(1, a.size()[1]);
  var n = a.size()[0];
  for(var i=0; i<n; i++){
    result = math.add(result, math.matrix([a.toArray()[i]]));
  }
  return math.multiply(1 / n, result);
}

function LDA(set1, set2){
  // sets are lists of vectors / points

  // Compute LDA
  var c1 = math.matrix(set1);
  var c2 = math.matrix(set2);
  var mu1 = math.transpose(mean(c1));
  var mu2 = math.transpose(mean(c2));
  var pooledCov = math.add(cov(c1), cov(c2));
  theta = math.multiply(math.inv(pooledCov), math.subtract(mu2, mu1));
  b = math.multiply(-1, math.transpose(theta), math.add(mu1, mu2), 1/2).get([0, 0]);

  this.theta = theta;
  this.b = b;
}

LDA.prototype.predict = function (vector) {
    var projection = math.add(math.multiply(vector, this.theta), this.b);
    return math.sign(math.squeeze(projection));
}

module.exports = LDA;
