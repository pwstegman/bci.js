"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oscStream = void 0;

var _nodeOsc = _interopRequireDefault(require("node-osc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Listen for messages over OSC
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 */
var oscStream = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {string} address - Address to listen on
   * @param {number} port - Port to listen on
   */
  function oscStream(address, port) {
    _classCallCheck(this, oscStream);

    this.address = address;
    this.port = port;
    this.onFuncs = {};
  }
  /**
   * Start listening for OSC messages
   */


  _createClass(oscStream, [{
    key: "start",
    value: function start() {
      this.server = new _nodeOsc.default.Server(this.port, this.address);
      var parent = this;
      this.server.on("message", function (msg, rinfo) {
        var header = msg[0];
        var data = msg.slice(1);

        if (header in parent.onFuncs) {
          parent.onFuncs[header](data);
        }
      });
    }
    /**
     * Stop listening for OSC messages
     */

  }, {
    key: "stop",
    value: function stop() {
      this.server.kill();
    }
    /**
     * Call a callback function when data containing a specified OSC header is seen
     * @param {string} header - The OSC header
     * @param {requestCallback} callback - Called with the OSC data passed as the parameter
     */

  }, {
    key: "on",
    value: function on(header, callback) {
      this.onFuncs[header] = callback;
    }
  }]);

  return oscStream;
}();

exports.oscStream = oscStream;