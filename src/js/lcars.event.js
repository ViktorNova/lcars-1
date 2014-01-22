/*
 *	check dependencies
 */

/**
 * LCARS Event
 * @var	Object	LCARSEventAbstract	LCARS debug
 */
var LCARSEventAbstract = {

	init				: function ( $element, $message, $code ) {},
	trigger				: function ( elements ) { return (this); },
	getMessage			: function () {},
	getCode				: function () {}
	
};

function LCARSEventTarget(){
	this._listeners = {};
}

LCARSEventTarget.prototype = {

	constructor: LCARSEventTarget,

	addListener: function(type, listener){
		if (typeof this._listeners[type] == "undefined"){
			this._listeners[type] = [];
		}

		this._listeners[type].push(listener);
	},

	fire: function(event){
		if (typeof event == "string"){
			event = { type: event };
		}
		if (!event.target){
			event.target = this;
		}

		if (!event.type){	//falsy
			throw new Error("Event object missing 'type' property.");
		}

		if (this._listeners[event.type] instanceof Array){
			var listeners = this._listeners[event.type];
			for (var i=0, len=listeners.length; i < len; i++){
				listeners[i].call(this, event);
			}
		}
	},

	removeListener: function(type, listener){
		if (this._listeners[type] instanceof Array){
			var listeners = this._listeners[type];
			for (var i=0, len=listeners.length; i < len; i++){
				if (listeners[i] === listener){
					listeners.splice(i, 1);
					break;
				}
			}
		}
	}
};

var LCARSEventObject = Object.extend(LCARSEventAbstract, {});
var LCARSEvent = $Class(LCARSEventObject); // .create
