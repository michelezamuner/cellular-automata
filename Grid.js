'use strict';
if (window.Cellular.Builder === undefined)
	'Missing dependencies';
Cellular.Grid = (function($, b) {
	var _rule = {
		'000': 0,
		'001': 1,
		'010': 0,
		'011': 0,
		'100': 0,
		'101': 1,
		'110': 0,
		'111': 1,
	};
	var _rows = [];
	
	function isBlack(bit) { return bit === 0; }
	
	return {
		setRule: function(rule) {
			_rule['000'] = parseInt(rule[0]);
			_rule['001'] = parseInt(rule[1]);
			_rule['010'] = parseInt(rule[2]);
			_rule['011'] = parseInt(rule[3]);
			_rule['100'] = parseInt(rule[4]);
			_rule['101'] = parseInt(rule[5]);
			_rule['110'] = parseInt(rule[6]);
			_rule['111'] = parseInt(rule[7]);
		},
		toPos: function(coord) {
			return coord * b.getSize() + b.getHalfSize();
		},
		toCoord: function(pos) {
			return Math.round((pos - b.getHalfSize()) / b.getSize());
		},
		add: function(x, y, black) {
			black = black === undefined || black === true;
			b.setBlack(black);
			
			if (_rows[y] === undefined) _rows[y] = [];
			_rows[y].push({ 'x': x, 'black': black });
			
			if (black) $('body').append(b
					.setX(this.toPos(x))
					.setY(this.toPos(y))
					.create());
		},
		generateRow: function(y) {
			var watching = _rows[y-1];
			var left = 1;
			var middle = 1;
			var right = undefined;
			var block = undefined;
			for (var i in watching) {
				block = watching[i];
				right = block.black ? 0 : 1;
				var black = isBlack(_rule[''+left+middle+right]);
				this.add(block.x-1, y, black);
				left = middle;
				middle = right;
			}
			this.add(block.x, y, isBlack(_rule[''+middle+right+'1']));
			this.add(block.x+1, y, isBlack(_rule[''+right+'11']));
			_rows[y-1] = undefined;
		}
	};
})(jQuery, Cellular.Builder);