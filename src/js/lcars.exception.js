/*
 *	check dependencies
 */

/**
 * LCARS Exception
 * @var	Object	LCARSExceptionAbstract	LCARS debug
 */
var LCARSExceptionAbstract = {

	init				: function ( $element, $message, $code ) {},
	trigger				: function ( elements ) { return (this); },
	getMessage			: function () {},
	getCode				: function () {}
	
};

var LCARSExceptionObject = Object.extend(LCARSExceptionAbstract, {});
var LCARSException = $Class(LCARSExceptionObject); // .create
