'use strict';
$(function() {
//	var builder = window.Cellar.Builder;
//	var grid = window.Cellar.Grid;
	var logger = Cellular.Logger;
	var builder = Cellular.Builder;
	var grid = Cellular.Grid;
	logger.setLog(false);
	builder.setSize(4);
	grid.setRule([0, 1, 0, 1, 0, 1, 1, 0]);
	
	var rows = 100;
	if (location.search) {
		var params = location.search
			.replace(/(^\?)/, '')
			.replace(/(\/$)/, '')
			.split('&')
			.map(function(n) {
				n = n.split('=');
				this[n[0]] = n[1];
				return this;
			}.bind({}))[0];
		if (params.rule) grid.setRule(params.rule);
		if (params.log) builder.setLog(params.log === 'true');
		if (params.size) builder.setSize(params.size);
		if (params.rows) rows = params.rows;
	}
	grid.add(grid.toCoord(Math.round(screen.width / 2)), 0);
	for (var i = 1; i <= rows; i++) {
		grid.generateRow(i);
	}
});