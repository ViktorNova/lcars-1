/*
 *	check dependencies
 */

/**
 * LCARS controller
 * @var	Object	LCARSControllerAbstract	LCARS controller
 * @extends	LCARSObjectAbstract
 */
var LCARSControllerAbstract = {};
var LCARSControllerObject = Object.extend(LCARSControllerAbstract, LCARSAction);
var LCARSController = $Class(LCARSControllerObject);
