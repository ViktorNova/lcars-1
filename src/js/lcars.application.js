/*
 *	check dependencies
 */

/**
 * LCARS Application
 * @var	Object	LCARSAbstract	LCARS jQuery extension
 * @extends	LCARSActionAbstract
 * @extends	LCARSObjectAbstract
 */
var LCARSApplicationAbstract = {
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

var LCARSApplicatonObject = Object.extend(LCARSApplicationAbstract, LCARSModule);
var LCARSApplicaton = $Class(LCARSApplicatonObject);
