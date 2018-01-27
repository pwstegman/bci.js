var Matrix = require('../lib/ds/Matrix.js');

var x = new Matrix([...Array(20).keys()]);
x.windowApply(window => console.log(window), 6, 3, false);