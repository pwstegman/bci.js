var osc = require('node-osc');


exports.addEEGListener = function(oscAddress, oscPort, eegAddress, callback){
  var oscServer = new osc.Server(oscPort, oscAddress);

  oscServer.on("message", function (msg, rinfo) {
        if(msg[0] == eegAddress){
          callback(msg.slice(1));
        }
  });
}
