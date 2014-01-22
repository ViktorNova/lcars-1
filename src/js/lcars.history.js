/*
 *	check dependencies
 */

/**
 * LCARS simple history object
 * @var	Object	LCARSHistoryAbstract	LCARS simple history object
 */
var LCARSHistoryAbstract = {
	/* manage history data */
	historyentries	: [],
	_currentIndex	: 0,

	clear			: function () { this.historyentries = []; this._currentIndex = 0; return (this); },
	back			: function () { return (--this._currentIndex); },
	forward			: function () { return (++this._currentIndex); },
	add				: function () { this.historyentries.push(arguments); return (++this._currentIndex); },
	get				: function () { return (arguments.length > 0) ? this.historyentries[parseInt(arguments[0])] : this.historyentries; },
	current			: function () { return this.historyentries[this._currentIndex]; }
};

var LCARSHistoryObject = Object.extend(LCARSHistoryAbstract, {});
var LCARSHistory = $Class(LCARSHistoryObject);
