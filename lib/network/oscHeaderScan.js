"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oscHeaderScan = oscHeaderScan;

var _nodeOsc = _interopRequireDefault(require("node-osc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @memberof module:bcijs.network
 */

/**
 * Scan for OSC headers on a port and address
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @param {any} address - OSC address
 * @param {any} port - OSC port
 * @param {any} duration - Duration of scan in milliseconds
 * @returns {Promise} Resolves with an array of found headers
 */
function oscHeaderScan(address, port, duration) {
  return new Promise(function (resolve, reject) {
    var server = new _nodeOsc.default.Server(port, address);
    var headers = new Set();
    server.on("message", function (msg, rinfo) {
      var header = msg[0];
      headers.add(header);
    });
    setTimeout(function () {
      server.kill();
      resolve(_toConsumableArray(headers));
    }, duration);
  });
}