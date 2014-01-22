/*
 *	check dependencies
 */

/**
 * LCARS login object
 * @var	Object	LCARSLoginAbstract	LCARS controller
 * @extends	LCARSActionAbstract
 */
var LCARSLoginAbstract = {};
var LCARSLoginObject = Object.extend(LCARSLoginAbstract, LCARSAction);
var LCARSLogin = $Class(LCARSLoginObject);
