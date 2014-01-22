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
	typeKey			: '_!!_',
	_types			: ['object','application','panel','module','action','element'],
	_parent			: null,
	
	// public
	id				: null,
	LCARSID			: null,
	name			: null,
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
	_autoconstruct	: true,
	init			: null, // function ( params ) {},
	constructor		: function ( config ) { 
		if (typeof config.parents.app != 'undefined') {
			this._app = config.parents.app;
		}
		if (typeof config.parents.module != 'undefined') {
			this._module = config.parents.module;
		}
		if (typeof config.parents.controller != 'undefined') {
			this._controller = config.parents.controller;
		}
		if (typeof config.parents.action != 'undefined') {
			this._action = config.parents.action;
		}
		if (typeof config.parents.mode != 'undefined') {
			this._mode = config.parents.mode;
		}
		if (typeof config.id != 'undefined') {
			this._mode = config.parents.mode;
		} else {
			config.id = this.getId();
		}
		if (LCARSDebug) { LCARSDebug.log('object created: ['+String(config.type)+'] '+String(config.id)+', '+String(config.name)); }
		if (typeof this.init == 'function') {
			if (LCARSDebug) { LCARSDebug.log('object ['+String(config.id)+']: init object...'); }
			return this.init();
		}
	},
	destroy			: null, // function ( params ) {},
	serialize		: function ( params ) { return (this); },
	unserialize		: function ( params ) { return (this); },

	
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
	onDestroy		: function ( params ) {},

	getConfig		: function ( params ) { return (this.config); },
	setConfig		: function ( params ) { return (this); },

	getParent		: function ( ) { return (this._parent); },
	setParent		: function ( parent ) { this._parent = parent; return (this); },

	getId			: function ( ) { return ( this.id || this.setId() ); },
	setId			: function ( sID ) { return (this); },
	
	_load			: function ( appParams ) {
		if (LCARSDebug) { LCARSDebug.log('load object config'); }
		if ( !(appParams instanceof Object) && (typeof appParams.appid == 'string') ) { 
			LCARSDebug.error('loading object config: invalid object options given...'); LCARSDebug.debug ( appParams ); 
			return (false);
		}
		if ( (typeof $LCARS.getInstance().config.applicationKey != 'string') || (trim($LCARS.getInstance().config.applicationKey) === '') ) {
			if (LCARSDebug) { 
				LCARSDebug.warn('loading object config: invalid or no application key given, terminating bootstrap process!'); 
				LCARSDebug.debug ( $LCARS.getInstance().config.applicationKey, $LCARS.getInstance().config ); 
			}
			return (false);
		}
		// $LCARS.getInstance().config.applicationKey
		var oLoader = new LCARSXHR({
			mode: "sync",
			url: '/'+this.typeKey+'/'+ $LCARS.getId +'/bootstrap/',
			params : Object.extend(appParams, {}),
			/*complete : function ( response ) {},*/
			success : function ( response ) {
				if (LCARSDebug) { LCARSDebug.log ( 'loading bootstrap: OK' ); }
				var resultBootstrap = response.responseJSON.results;
				$LCARS.getInstance().setObject('applications', resultBootstrap.configs.application.key, resultBootstrap); 
				if (LCARSDebug) { LCARSDebug.debug ( response.responseJSON ); }
			},
			failure : function ( response ) {
				if (LCARSDebug) { LCARSDebug.error('loading bootstrap failed: ...'); LCARSDebug.debug ( response ); }
			}

		});
		oLoader.execute();
		if (LCARSDebug) { LCARSDebug.log ( 'loading bootstrap completed' ); }
		return (this);
	}
		
};

var LCARSObjectObject = Object.extend(LCARSObjectAbstract, {});
var LCARSObject = $Class(LCARSObjectObject);
