/**
 * LCARS Module
 * @var	Object	LCARSModuleAbstract	LCARS jQuery extension
 * @extends	LCARSPanelAbstract
 * @extends	LCARSObjectAbstract
 */
var LCARSModuleAbstract = {
	/* screen element(s) level types and methods */

	_panel			: null,

	type			: 'module',
	typeKey			: '____',
	
	defaultTag		: 'section',
	
	create			: function ( options ) {},
	
	getPanel		: function ( ) { return (this._panel); },
	setPanel		: function ( _panel ) { this._panel = _panel; return (this); }

};

var LCARSModuleObject = Object.extend(LCARSModuleAbstract, LCARSPanel);
var LCARSModule = $Class(LCARSModuleObject);

