'use strict';
window.Cellular = window.Cellular || {};
window.Cellular.Logger = (function() {
	var _log = false;
	return {
		setLog: function(log) { _log = log === true; },
		log: function(message) { if (_log) console.log(message); }
	};
})();