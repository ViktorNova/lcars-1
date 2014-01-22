/**
 * LCARS brainstorming objects, functions, etc...
 */

if (!jQuery) {
	throw "jQuery is required!";
}

/**
 * LCARS Action
 * @var	Object	LCARSActionAbstract	LCARS jQuery extension
 * @extends	LCARSObjectAbstract
 */
var LCARSActionAbstract = {
	/* action element(s) level types and methods */

	init			: function ( params ) {},
	
	// methods
	execute			: function ( params ) {},
	update			: function ( params ) {},
	cancel			: function ( params ) {},
	request			: function ( params ) {},
	
	GET				: function ( params ) {},
	PUT				: function ( params ) {},
	UPDATE			: function ( params ) {},
	DELETE			: function ( params ) {},

	// events
	onGET			: function ( params ) {},
	onPUT			: function ( params ) {},
	onUPDATE		: function ( params ) {},
	onDELETE		: function ( params ) {},
	
	onExecute		: function ( params ) {},
	onUpdate		: function ( params ) {},
	onCancel		: function ( params ) {},
	onRequest		: function ( params ) {},
	
	// object default actions
	action			: function ( params ) {},
	module			: function ( params ) {},
	panel			: function ( params ) {},
	screen			: function ( params ) {},

	// privates
	_autoinit		:	true,
	_autorun		:	false,

	_mode			:	null,
	_module			:	null,
	_controller		:	null,
	_action			:	null

};

/**
 * LCARS Panel
 * @var	Object	LCARSPanelAbstract	LCARS jQuery extension
 * @extends	LCARSActionAbstract
 * @extends	LCARSObjectAbstract
 */
var LCARSPanelAbstract = {
	/* panel element(s) level types and methods */
	
};

/**
 * LCARS Module
 * @var	Object	LCARSModuleAbstract	LCARS jQuery extension
 * @extends	LCARSPanelAbstract
 * @extends	LCARSObjectAbstract
 */
var LCARSModuleAbstract = {
	/* module element(s) level types and methods */
};

/**
 * LCARS Screen
 * @var	Object	LCARSAbstract	LCARS jQuery extension
 * @extends	LCARSPanelAbstract
 * @extends	LCARSObjectAbstract
 */
var LCARSScreenAbstract = {
	/* screen element(s) level types and methods */

};

/**
 * LCARS Application
 * @var	Object	LCARSAbstract	LCARS jQuery extension
 * @extends	LCARSActionAbstract
 * @extends	LCARSObjectAbstract
 */
var LCARSApplicatonAbstract = {
	/* application element(s) level types and methods */
	
	_autoinit		:	true,
	_autorun		:	false,
	
	// frontend	
	initAction		: function ( params ) {},
	executeAction	: function ( params ) {},
	cancelAction	: function ( params ) {},
	
	initModule		: function ( params ) {},
	updateModule	: function ( params ) {},
	getModule		: function ( params ) {},
	
	initPanel		: function ( params ) {},
	updatePanel		: function ( params ) {},
	getPanel		: function ( params ) {},
	
	initScreen		: function ( params ) {},	
	getScreen		: function ( params ) {},
	updatetScreen	: function ( params ) {},
	
	initApplication	: function ( params ) {},
	resetApplication: function ( params ) {},

	triggerAction	: function ( params ) {},
	
	// backend
	login			: function ( params ) {},
	logout			: function ( params ) {}
		
};

/**
 * LCARS base object
 * @var	Object	LCARSObjectAbstract	LCARS base object
 */
var LCARSObjectAbstract = {
	// object	
	config			: {},
	objects			: {},
	acl				: {},
	type			: 'object',
	_types			: ['object','application','panel','module','action','element'],

	// public
	id				: null,
	LCARSID			: null,
	checkACL		: function ( oACL ) {},
	get				: function ( ) { return (this); },
	isSet			: function ( $key ) { return (typeof this[$key] != 'undefined'); },
	isMethod		: function ( $name ) { return (typeof this[$name] == 'function'); },
	hasEvent		: function ( $name ) { return (typeof this.events[$name] == 'function'); },
	
	// dummies
	getDummyByKey	: function ( params ) {},
	getDummyBy		: function ( params ) {},
	getDummy		: function ( params ) {},
	addDummy		: function ( params ) { return (this); },
	setDummy		: function ( params ) { return (this); },
	unsetDummy		: function ( params ) { return (this); },

	// private
	_autoinit		: false,
	init			: null, // function ( params ) {},
	constructor		: null, // function ( params ) {},
	destroy			: null, // function ( params ) {}

	
	// refs
	_app			: null,
	_screen			: null,
	_module			: null,
	_panel			: null,
	_action			: null,
	_getRefs		: function ( params ) {},
	
	// events
	onInit			: function ( params ) {},
	onError			: function ( params ) {},
	onException		: function ( params ) {},
	onDestroy		: function ( params ) {}

};

/**
 * LCARS collection methods
 * @var	Object	LCARSCollectionAbstract	LCARS collection
 */
var LCARSCollectionAbstract = {
	/* application base level types and methods */
	
	// keep track of objects
	objects : {
		screens	: {},
		panels	: {},
		modules	: {},
		actions	: {}
	},
	
	getObject : function ( $type, $key ) {
		if (typeof this.objects[$type][$key] != 'undefined') {
			return this.objects[$type][$key];
		} else if (typeof this.objects[$type] != 'undefined') {
			return this.objects[$type];
		}
		return (null);
	},
	
	setObject : function ( $type, $key, $value ) {
		var arg1x = arguments;
		var arg2x = arguments;
		arg1x.shift();
		arg2x.shift(); arg2x.shift();
		if ( (typeof this.objects[$type][$key] != 'undefined') ) {
			this.objects[$type][$key] = arg2x;
		} else if ( (arguments.length > 2) && (typeof this.objects[$type] != 'undefined') ) {
			this.objects[$type][$key] = arg2x;
		} else if ( (arguments.length > 2) && (typeof this.objects[$type] == 'undefined') ) {
			this.objects[$type] = {};
			this.objects[$type][$key] = arg2x;
		} 
		return (this);
	},
	
	removeObject : function ( $type, $key ) {
		if (typeof this.objects[$type][$key] != 'undefined') {
			this.objects[$type][$key] = null;
		} else if (typeof this.objects[$type] != 'undefined') {
			this.objects[$type] = null;
		}
		return (this);
	}
	
};

/**
 * LCARS history object
 * @var	Object	LCARSHistoryAbstract	LCARS history object
 */
var LCARSHistoryAbstract = {
	/* manage history data */
	historyentries	: [],
	_currentIndex	: 0,

	clear			: function () { this.historyentries = []; this._currentIndex = 0; return (this); },
	back			: function () { return (--this._currentIndex); },
	forward			: function () { return (++this._currentIndex); },
	add				: function () { this.historyentries.push(arguments) return (--this._currentIndex); },
	get				: function () { return (arguments.length > 0) ? this.historyentries[parseInt(arguments[0])] : this.historyentries; },
	current			: function () { return this.historyentries[this._currentIndex]; }
};

/**
 * LCARS session object
 * @var	Object	LCARSSessionAbstract	LCARS session object
 */
var LCARSSessionAbstract = {
	/* read-only object to retrieve current application server side (user) session data */
	get : function () {}
};

/**
 * LCARS Debug
 * @var	Object	LCARSDebugAbstract	LCARS debug
 */
var LCARSDebugAbstract = {
	/* manage debug data */
	debugentries : [],

	debug : function ( ) { this.debugentries.push(arguments); return (this); }

};

/**
 * LCARS Log
 * @var	Object	LCARSLogAbstract	LCARS Log
 */
var LCARSLogAbstract = {
	/* manage debug data */
	logentries : [],

	log : function ( $message, $type, $context ) { this.logentries.push(arguments); return (this); }

};

/**
 * LCARS Exception
 * @var	Object	LCARSExceptionAbstract	LCARS debug
 */
var LCARSExceptionAbstract = {

	init				: function ( $element, $message, $code ) {},
	trigger				: function ( elements ) { return (this); },
	getMessage			: function () {},
	getCode				: function () {}
	
};

/**
 * LCARS jQuery extension public methods
 * @var	Object	LCARSAbstract	LCARS jQuery extension
 */
var LCARSAbstract = {
	
	myFunc : function ( element ) {
		console.debug(this);
		this.each(function () {
			console.debug(this.LCARSID);
			console.log('LCARS function triggered');
		});
	}
	/*
	this.init = init;
	this.lcarsFunc = lcarsFunc;
		
	console.debug(this);
	*/
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
		

	var _constructed = false;
	var _hasOptions = false;
	
	var init = function ( options ) {
		this.each(function () {
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

