/*
 *  check dependencies
 */
if (!jQuery) {
	throw "jQuery is required!";
}

var LCARSAdapter_jQuery = {
		
	_const : {
		idPrefix : 'lcars_'
	},
	
	application	: function ( element, params ) {},
	screen		: function ( element, params ) {},
	panel		: function ( element, params ) {},
	module		: function ( element, params ) {},
	controller	: function ( element, params ) {},
	action		: function ( element, params ) {},
	
	create : function ( element, type, params ) {
		if ( (arguments.length == 3) || false ) {
			params.type=type;
		}
		var args = [];//arguments;
		//args.
	},
	
	destroy : function ( type, objectid ) {
		if ( (arguments.length < 2) || false ) {
			return this;
		}
		//var
	},
	
	getId : function ( element ) {
		if (typeof element != 'object') {
			var element = this;
		}
		if (!element.LCARSID) {
			element.LCARSID = (new Date).getTime() + '' + Math.round( 1 + 999999*(Math.random()) ) ;
		}
		return element.LCARSID;
	},
	
	getApp : function ( element ) {
		var oApp = null;
		if (typeof element != 'object') {
			var element = this;
		}
		if (element.LCARS.type == 'application') {
			return element;
		} else {
			return LCARS.getApplicationNode();
		}
	},
	
	getApplicationNode : function ( element ) {
		if (typeof element != 'object') {
			LCARSLog.error('fatal','no object element given');
		}
		if (!element.LCARSID) {
			element.LCARSID = (new Date).getTime() + '' + Math.round( 1 + 999999*(Math.random()) ) ;
		}
		return element.LCARSID;
	}
			
};

/**
 * LCARS jQuery extension
 * @returns	jQuery.LCARS	LCARS jQuery extension
 */
(function( $ ){

	var settings = {
		'location'	:	'',
		'target'	:	'',
		'options'		:	{
		}
	};
		
	var init = function ( options ) {
		this.each(function () {

			var _constructed = false;
			var _hasOptions = false;
			
			var $this = $(this);
			var oData = $this.data('LCARS');
			if ( options ) {
				_hasOptions = true;
				// have options to set
				$.extend( settings, options );
				if (!oData) {
					//return (false);
				} else  {
					_constructed = true;
					//return ($this);
				} 
			} else {
				if (!oData) {
					return (false);
				} else  {
					_constructed = true;
					//return ($this);
				} 
			}
			if ( !this.LCARSID && !this._LCARS ) {
				this.LCARSID = (new Date).getTime() + '' + Math.round( 1 + 999999*(Math.random()) ) ;
				var oData = $this.data('LCARS');
				if (!oData) {
					$this.data('LCARS', {
						LCARS	:	$this,
						options	:	settings
					});
				}
				this._LCARS = $this;
				console.debug(this);
				console.log('LCARS init triggered');
			} 

			return ($this);
		});
		
		
		return (this);
	};
	
	//
	// private
	//
	var $_super		=	this;
	
	
	//
	// plugIn init
	//
	/**
	 * initialize jQuery plugIn
	 * 
	 * @param	methos
	 * @returns	jQuery.popupSubmit
	 */
	$.fn.LCARS = function( method ) {
		$this = $(this);
		// Method calling logic
		if ( publicMethods[method] ) {
			return publicMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return init.apply( this, arguments );
		} else {
			$.error( 'Method ' +	method + ' does not exist on jQuery.LCARS' );
		}		
		return (this);
		
	};
	
	//
	// plugIn public methods init
	//
	

	if ( _constructred && _hasOptions ) {
		//$this.resetLCARS.apply($this, (settings);
		if (typeof $.fn['reset'] == 'function') {
			return ($.fn['reset'].apply($this, settings));
		}
	} else if ( _constructred && !_hasOptions ) {
		return ($this);
	} else if ( !_constructred && _hasOptions ) {
		
		var publicMethods = LCARSObjectAbstract;
		
		if (LCARSObjectAbstract._types.indexOf(this.setting.type)) {
			$.extend( publicMethods, LCARSAbstract );
		}
		
		$.extend( publicMethods, LCARSAbstract );
		
		for ( name in publicMethods ) {
			if (typeof publicMethods[name] == 'function') {
				var aNoGoes = ['init', 'constructor'];
				if ( ( name != 'constructor' ) && ( name != 'init' ) && !$.fn[name] ) { // && !$.fn.LCARS[name] ) {
					$.fn[name] = publicMethods[name];
					//$.fn.LCARS[name] = $.fn['LCARS.'+name];
				} else if ( ( name == 'init' ) && !!$.fn[name] ) { // && !$.fn.LCARS[name] ) {
					$.fn[name] = publicMethods[name];
					//$.fn.LCARS[name] = $.fn['LCARS.'+name];
				} else if ( ( name == 'constructor' ) && !!$.fn[name] ) { // && !$.fn.LCARS[name] ) {
					$.fn[name] = publicMethods[name];
					//$.fn.LCARS[name] = $.fn['LCARS.'+name];
				}
			}
		}
		
		if (typeof $.fn['constructor'] != 'function') {
			return (this);
		} else {
			return ($.fn['constructor'].apply($this, settings));
			//return ($this.init.apply($this, settings));
		}
		
		if (typeof $.fn['init'] != 'function') {
			return (this);
		} else {
			return ($.fn['init'].apply($this, settings));
			//return ($this.init.apply($this, settings));
		}
	} 
	

})( jQuery );

/**
 * LCARS jQuery extension shortcut
 * @var	$LCARS	jQuery.LCARS	LCARS jQuery extension
 */
var $LCARS = function ( element, options ) {
	//if (!options) return jQuery(element);
	return jQuery(element).LCARS(options);
};

