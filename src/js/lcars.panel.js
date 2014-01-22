/*
 *	check dependencies
 */
if (typeof LCARSElement == 'undefined') { throw ('LCARSElement object is required for LCARSPanel!'); }

/**
 * LCARS Panel
 * @var	Object	LCARSPanelAbstract	LCARS jQuery extension
 * @extends LCARSElement
 */
var LCARSPanelAbstract = {
	/* panel element(s) level types and methods */

	_panel			: null,
	
	type			: 'panel',
	typeKey			: '_==_',
	
	defaultTag		: 'section',
	
	createElement	: function ( options ) {
		var panel = document.createElement(this.defaultTag);
		panel.id = this.getId();
		panel.className = this.getConfig().classname;
		this._panel = panel;
		return this._panel;
	},
	
	init			: function () {
		if (LCARSDebug) { LCARSDebug.log('object ['+String(config.id)+']: init panel...'); }
	},
	
	getPanel		: function ( ) { return (this._panel); },
	setPanel		: function ( _panel ) { this._panel = _panel; return (this); }

};

var LCARSPanelObject = Object.extend(LCARSPanelAbstract, LCARSElement);
var LCARSPanel = $Class(LCARSPanelObject);
