/*
 *	check dependencies
 */
if (typeof LCARSObject == 'undefined') { throw ('LCARSObject object is required for LCARSAction!'); }

/**
 * LCARS Action
 * @var	Object	LCARSActionAbstract	LCARS jQuery extension
 * @extends	LCARSObject
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

var LCARSActionObject = Object.extend(LCARSActionAbstract, LCARSObject);
var LCARSAction = $Class(LCARSActionObject);
