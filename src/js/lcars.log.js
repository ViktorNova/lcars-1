/**
 * LCARS Log
 * @var	Object	LCARSLogAbstract	LCARS Log
 */
var LCARSLogAbstract = {
	logentries		: [],
	loglevel		: 0,
	logtypes		: ['debug','info','warn','exception'],
	_currentIndex	: 0,

	log				: function ( message, type, context ) { this.logentries.push(arguments); return (this); },
	get				: function () { return (arguments.length > 0) ? this.logentries[parseInt(arguments[0])] : this.logentries; },
	clear			: function () { this.logentries = []; this._currentIndex = 0; return (this); },

	setLevel		: function () { if (arguments.length > 0) { this.loglevel = parseInt(arguments[0]); } else { this.loglevel = 0; } return (this); }
	
};

var LCARSLogObject = Object.extend(LCARSLogAbstract, {});
var LCARSLog = $Class(LCARSLogObject);
