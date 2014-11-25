'use strict';
if (Cellular.Logger === undefined)
	throw 'Missing dependencies';
Cellular.Builder = (function($, l) {
	var _black = false;
	var _x = 0;
	var _y = 0;
	var _size = 4;
	
	return {
		log: function(message) {
			l.log(message);
		},
		setBlack: function(black) {
			_black = black === undefined || black === true;
			return this;
		},
		isBlack: function() {
			return _black;
		},
		setX: function(x) { _x = x; return this; },
		setY: function(y) { _y = y; return this; },
		setSize: function(size) { _size = size; return size; },
		getSize: function() { return _size; },
		getHalfSize: function() { return Math.round(_size / 2); },
		create: function() {
			this.log('Size: ' + _size);
			this.log('X: ' + _x);
			this.log('Y: ' + _y);
			
			var left = _x - this.getHalfSize();
			var top = _y - this.getHalfSize();
			
			this.log('Left: ' + left);
			this.log('Top: ' + top);
			
			return $('<div class="block"></div>').clone()
				.css({
					'width': _size,
					'height': _size,
					'left': left + 'px',
					'top': top + 'px'
				});
		}
	};
})(jQuery, Cellular.Logger);