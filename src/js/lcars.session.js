/*
 *	check dependencies
 */

/**
 * LCARS session object
 * @var	Object	LCARSSessionAbstract	LCARS session object
 */
var LCARSSessionAbstract = {
	/* read-only object to retrieve current application server side (user) session data */
	get : function () {}
};

var LCARSSessionObject = Object.extend(LCARSSessionAbstract, LCARSObject);
var LCARSSession = $Class(LCARSSessionObject);

