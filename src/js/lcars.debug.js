/*
 *	check dependencies
 */

/**
 * LCARS Debug
 * @var	Object	LCARSDebugAbstract	LCARS debug
 */
var LCARSDebugAbstract = {
	/* manage debug data */
	debugentries : [],
	
	types : ['log', 'debug', 'info', 'warn', 'error'],
	
	add : function ( oEntry ) {
		var entry = {
			type : oEntry.type || 'info',
			message : oEntry.message || '',
			time : oEntry.time || (new Date())
		};
		this.debugentries.push(entry);
		return (this);
	},

	clear : function ( ) {
		this.debugentries = [];
		return (this);
	},

	toEntry : function ( ) {
		var entry = arguments;
		if (entry.length == 1) {
			entry[1] = entry[0];
			entry[0] = 'info';
		}
		return {
			type : entry[0] || 'info',
			message : entry[1] || '',
			time : (new Date()),
		};
	},
	
	debug : function ( ) { 
		if ( (console || (typeof console.debug == 'function')) && $LCARS.getInstance().config.debug ) {
			console.debug(arguments);
		}
		return (this);
	},

	log : function ( msg ) { var entry = this.toEntry('log', msg); this.add(entry).console(entry); return (this); },
	
	info : function ( msg ) { var entry = this.toEntry('info', msg); this.add(entry).console(entry); return (this); },

	warn : function ( msg ) { var entry = this.toEntry('warn', msg); this.add(entry).console(entry); return (this); },
	
	error : function ( msg ) { var entry = this.toEntry('error', msg); this.add(entry).console(entry); return (this); },
	
	console : function ( data ) {
		if (!console || !data || !data.type || !data.message || !data.time || !$LCARS.getInstance().config.debug) {
			return (this);
		}
		var txt = [
			String(data.type).toUpperCase(), ': ',
			String(data.message), ' - ',
			String(data.time), ''
		].join('');
		if ( (typeof console[data.type] == 'function') ) {
			console[data.type](txt);
		} else {
			console.log(txt);
		}
		return (this);
	},
	
	get : function ( ) {
		if (arguments.length === 0) {
			return ( this.debugentries );
		} else if (arguments.length == 1) {
			var entries = [];
			for ( var iEntry in this.debugentries )
				if ( this.debugentries[iEntry].type == arguments[0] ) 
					entries.push( this.debugentries[iEntry] );
			return ( entries );
		}
		return (false);
	},
	
	getInstance : function ( ) {
		return (this);
	}
	
};
var LCARSDebugObject = Object.extend(LCARSDebugAbstract, {});
var LCARSDebug = LCARSDebugObject; // $Class(LCARSDebugAbstract, {});


