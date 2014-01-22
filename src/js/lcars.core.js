/*
 *	check dependencies
 */

/**
 * LCARS jQuery extension public methods
 * @var	OBJECT	LCARSAbstract	LCARS jQuery extension
 */
var LCARSAbstract = {
	
	version : 'dev',
	
	/*
	myFunc : function ( element ) {
		console.debug(this);
		this.each(function () {
			console.debug(this.LCARSID);
			console.log('LCARS function triggered');
		});
	},
	this.init = init;
	this.lcarsFunc = lcarsFunc;
		
	console.debug(this);
	*/

	_registry : null,
	
	
	_const : {
		idPrefix : 'lcars_'
	},
	
	application	: function ( element, params ) {
		if (!element) { return (false); }
		if (arguments.length == 1) {
			// return a list of or a single application associated with the selected element(s)
			return [];
		}
		if ( !(params instanceof Object)) {
			return (false);
		}
	},
	
	screen		: function ( element, params ) {},
	panel		: function ( element, params ) {},
	module		: function ( element, params ) {},
	controller	: function ( element, params ) {},
	action		: function ( element, params ) {},
	
	create		: function ( element, type, params ) {
		if ( (arguments.length == 3) || false ) {
			params.type=type;
		}
		var args = [];//arguments;
		//args.
	},
	
	destroy		: function ( type, objectid ) {
		if ( (arguments.length < 2) ) {
			return this;
		}
		LCARSLog.error('debug', 'destroyed object id '+String(objectid));
		return this.removeObject( type, objectid );
	},
	
	getId : function ( element ) {
		if (typeof element != 'object') {
			element = this;
		}
		if (!element.LCARSID) {
			element.LCARSID = (new Date()).getTime() + '' + Math.round( 1 + 999999*(Math.random()) ) ;
			LCARSLog.error('debug', 'assign LCARS id '+String(element.LCARSID));
		}
		return element.LCARSID;
	},
	
	getApp : function ( appId ) {
		return this.getApplicationById(appId);
	},
	
	getApplicationById : function ( appId ) {
		if (typeof appId == 'undefined') {
			LCARSLog.error('debug', 'no application id given');
			return (false);
		}
		var oApp = this.getObject('application', String(appId));
		if (!oApp) {
			LCARSLog.error('debug', 'no application found for id '+String(appId) );
		}
		return oApp;
	},
	
	getInstance : function ( ) {
		return (this);
	}
	
};

var $LCARS = Object.extend(LCARSAbstract, LCARSCollection); // $Class(LCARSAbstract, LCARSCollection);
var $LCARSObject = Object.extend(LCARSAbstract, LCARSCollection);

var _LCARS = $LCARS;
var _LCARSObject = $LCARSObject;


