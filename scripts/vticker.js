// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "vticker",
				defaults = {
				activeElement: ".item",
				upArrow: "Yo!"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
					var $tickerItem = $(this).find('.item');
					var $tickerWrapper = $(this).find('.innerContent');
				
					this.adjustFirst();
					//On load auto play
					var interval = setInterval(Plugin.prototype.hbanimationUp, 3000);
				
					//on hover pause 
					$(this).find('.innerContent').hover(function () {
						clearInterval(interval);
					}, function () {
						interval = setInterval(Plugin.prototype.hbanimationUp, 3000);
					});
				
					$('#ticker-up').click(function (e) {
						e.preventDefault();
						e.stopPropagation();
						clearInterval(interval);
						Plugin.prototype.hbanimationDown();
					});
					$('#ticker-down').click(function (e) {
						e.preventDefault();
						e.stopPropagation();
						clearInterval(interval);
						Plugin.prototype.hbanimationUp();
					});
				},
				adjustFirst: function () {
					
					$('#heartbeatModule').find('.item').last()
						.prev()
						.remove()
						.clone()
						.prependTo('.innerContent')
						.css('margin-top', (-1 * ($(this).find('item').outerHeight(true))));

				},
				
				hbanimationUp: function () {
					var $tickerItem = $('#heartbeatModule').find('.item');
				
					//Grab outerheight of 3 elements in view and set wrapper height
					$('.innerContent').css('height', 
						$tickerItem.eq(2).outerHeight() 
						+ $tickerItem.eq(3).outerHeight() 
						+ $tickerItem.eq(4).outerHeight()
						);
							
					$tickerItem.first()
						.remove()
						.clone()
						.appendTo('.innerContent')
						.css('margin-top', '0');
						
					$tickerItem = $('#heartbeatModule').find('.item');
					$tickerItem.first()
					.stop()
					.animate({
						marginTop: '-' + $tickerItem.first().outerHeight()
					}, 1000, "swing");//end animate
				},
				
				hbanimationDown: function () {
					var $tickerItem = $('#heartbeatModule').find('.item');
					$('.innerContent').css('height', 
						$tickerItem.eq(0).outerHeight() 
						+ $tickerItem.eq(1).outerHeight() 
						+ $tickerItem.eq(2).outerHeight());
						
					var marginTop = -1 * ($tickerItem.last().outerHeight(true));
					
					$tickerItem.first().stop().animate({
						marginTop: '0'
					}, 1000, "swing", function () {
						$tickerItem.last().remove().clone().prependTo('.innerContent').css('margin-top', marginTop);
				
				
					});//end animate
						
				}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});

				// chain jQuery functions
				return this;
		};

})( jQuery, window, document );// JavaScript Document