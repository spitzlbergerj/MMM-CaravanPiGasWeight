/* ---------------------------------------------------------------------
 * Magic Mirror
 * Module: MMM-CaravanPiGasWeight
 *
 * CaravanPi Module
 * see https://github.com/spitzlbergerj/CaravanPi for more Information 
 *		 about the DIY project 
 *
 * By Josef Spitzlberger	http://spitzlberger.de
 * MIT Licensed.
 */

const NodeHelper = require("node_helper")
var async = require('async');
var exec = require('child_process').exec;

//globale Variable, weil diese ansonsten in fillValueList unbekannt
valueListNHCaravanPiGasWeight = [];

module.exports = NodeHelper.create({
	
	start: function() {
		//console.error('Starting node helper: ' + this.name);
	},
	
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		// console.error('node_helper: ' + notification);
		
		switch(notification) {
			case "CONFIG":
				this.config = payload.config;
				valueListNHCaravanPiGasWeight = payload.valueList;
				// first call
				self.getValues(valueListNHCaravanPiGasWeight);
				// interval call
				setInterval(function() {
					self.getValues(valueListNHCaravanPiGasWeight);
				}, this.config.updateInterval);
				break
		}
	},
	
	getValues: function(valueList) {
		var self = this;
		var cmdPart = "tail -1 " + self.config.valueDir + "/";
		var cmd = "";
		var i = 0;
		
		while (i<valueList.length) {
			cmd = cmdPart + valueList[i]["file"]
			// console.error('node_helper - cmd', cmd);
			exec(cmd,"",this.fillValueList);

			i+=1;
		}

		// console.error('node_helper - getValues - valueList after', valueListNHCaravanPiGasWeight[0], valueListNHCaravanPiGasWeight[1]);
		self.sendSocketNotification('VALUES', valueListNHCaravanPiGasWeight);
	},
	
	fillValueList: function (err, stdout, stderr) {
		var i = 0;
		
		if (err) {
			// console.error('node_helper - fillValueList - Fehler:', err, stderr);
			return;
		}

		// console.error('node_helper - fillValueList - stdout:', stdout, '<<');
		// console.error('node_helper - fillValueList - stderr:', stderr, '<<');

		var resSplit = stdout.split(' ');
		var sensorID = resSplit[0];
		
		// console.error('node_helper - fillValueList ', stdout, sensorID);
		
		while (i<valueListNHCaravanPiGasWeight.length) {
			if (sensorID === valueListNHCaravanPiGasWeight[i]["file"]) {
				valueListNHCaravanPiGasWeight[i]["datetime"] = resSplit[1].substring(6,8)+"."+resSplit[1].substring(4,6)+"."+resSplit[1].substring(0,4)+" "+resSplit[1].substring(8,10)+":"+resSplit[1].substring(10,12);
				valueListNHCaravanPiGasWeight[i]["weight"] = resSplit[2];
				valueListNHCaravanPiGasWeight[i]["level"] = resSplit[3];
			}
			i+=1;
		}
		return;
	},

})
