var plot = require('./plot.js');
var math = require('mathjs');

plot(math.range(1, 100).toArray(), math.random([1, 100])[0], 400, 100);