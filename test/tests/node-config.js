/* When tests are run in Node, we concat this require to the top.
   When tests run in browser, we include the bci.js dist file
   instead */
global.bci = require('../../index.js');
global.assert = require('assert');
global.arrayAlmostEqual = require('./shared/util/arrayAlmostEqual.js');
global.math = require('mathjs');
