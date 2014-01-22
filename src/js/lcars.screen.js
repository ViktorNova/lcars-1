/**
 * LCARS Screen
 * @var	Object	LCARSAbstract	LCARS jQuery extension
 * @extends	LCARSPanelAbstract
 * @extends	LCARSObjectAbstract
 */
var LCARSScreenAbstract = {
	/* screen element(s) level types and methods */
	init			: function () {
		if (LCARSDebug) { LCARSDebug.log('object ['+String(config.id)+']: init screen...'); }
		
	}
		
};

var LCARSScreenObject = Object.extend(LCARSScreenAbstract, LCARSModule);
var LCARSScreen = $Class(LCARSScreenObject);

