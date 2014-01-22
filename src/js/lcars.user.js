/*
 *	check dependencies
 */

/**
 * LCARS user object
 * @var	Object	LCARSUserAbstract	LCARS controller
 * @extends	LCARSObjectAbstract
 */
var LCARSUserAbstract = {};
var LCARSUserObject = Object.extend(LCARSUserAbstract, LCARSObject);
var LCARSUser = $Class(LCARSUserObject);
