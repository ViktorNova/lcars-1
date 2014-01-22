/*
 *	check dependencies
 */
if (typeof LCARSAction == 'undefined') { throw ('LCARSAction object is required for LCARSElement!'); }

/**
 * LCARS Element
 * @var	Object	LCARSElementAbstract	LCARS Element Object
 * @extends	LCARSActionAbstract
 * @extends	LCARSObjectAbstract
 */
var LCARSElementAbstract = {
	/* panel element(s) level types and methods */
		
	_element		: null,
	_template		: null,
	_templateVars	: null,
	defaultTag		: 'div',
	
	create			: function ( options ) {},

	createElement	: function ( type, attrs, parent ) {},
	createFromTemplate	: function () {
		if (!this._template) return '';
	},

	getElement		: function ( ) { return (this._element); },
	setElement		: function ( _element ) { this._element = _element; return (this); },

	getTemplate		: function ( ) { return (this._template); },
	setTemplate		: function ( _template, _vars ) { this._template = _template; return (this); },

	getTemplateVars	: function ( ) { return (this._templateVars); },
	setTemplateVars	: function ( _vars ) { this._templateVars = _templateVars; return (this); }

};

var LCARSElementObject = Object.extend(LCARSElementAbstract, LCARSAction);
var LCARSElement = $Class(LCARSElementObject);
