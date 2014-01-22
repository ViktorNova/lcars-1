/*
 *	check dependencies
 */

/**
 * LCARS Debug Panel
 * @var	Object	LCARSDebugpanelAbstract	LCARS debug
 * @extends	LCARSPanel
 */
var LCARSDebugpanelAbstract = {
	/* manage debug data */
	debugentries : [],

	debug : function ( ) { this.debugentries.push(arguments); return (this); }

};
var LCARSDebugpanelObject = Object.extend(LCARSDebugpanelAbstract, LCARSModule);
var LCARSDebugpanel = $Class(LCARSDebugpanelObject);

