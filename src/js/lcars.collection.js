/*
 *	check dependencies
 */


/**
 * LCARS collection methods
 * @var	Object	LCARSCollectionAbstract	LCARS collection
 */
var LCARSCollectionAbstract = {
	
	// keep track of objects
	objects : {
		applications	: {},
		screens			: {},
		panels			: {},
		modules			: {},
		actions			: {}
	},
	
	getObject : function ( $type, $key ) {
		if ( (arguments.length == 2) && (typeof this.objects[$type][$key] != 'undefined') ) {
			return this.objects[$type][$key];
		} else if ( (arguments.length == 1) && (typeof this.objects[$type] != 'undefined') ) {
			return this.objects[$type];
		} else if (LCARSDebug) { LCARSDebug.warn("LCARSCollectionAbstract.getObject(): invalid arguments"); }
		return (null);
	},
	
	setObject : function ( $type, $key, $value ) {
		if ( (arguments.length > 1) && (typeof this.objects[$type] != 'undefined') && (typeof $key != 'undefined') ) {
			this.objects[$type][$key] = (typeof $value != 'undefined') ? $value : null;
		} else if (LCARSDebug) { LCARSDebug.error("LCARSCollectionAbstract.setObject(): invalid arguments"); }
		return (this);
		/*
		var arg1x = arguments;
		var arg2x = arguments;
		arg1x.shift();
		arg2x.shift(); arg2x.shift();
		if ( (typeof this.objects[$type][$key] != 'undefined') ) {
			this.objects[$type][$key] = arg2x;
		} else if ( (arguments.length > 2) && (typeof this.objects[$type] != 'undefined') ) {
			this.objects[$type][$key] = arg2x;
		} else if ( (arguments.length > 2) && (typeof this.objects[$type] == 'undefined') ) {
			this.objects[$type] = {};
			this.objects[$type][$key] = arg2x;
		} 
		return (this);
		*/
	},
	
	removeObject : function ( $type, $key ) {
		if ( (arguments.length == 2) && (typeof this.objects[$type][$key] != 'undefined') ) {
			this.objects[$type][$key] = null;
		} else if ( (arguments.length == 1) && (typeof this.objects[$type] != 'undefined') ) {
			this.objects[$type] = null;
		} else if (LCARSDebug) { LCARSDebug.warn("LCARSCollectionAbstract.removeObject(): not object to remove"); }
		return (this);
	}
	
};

var LCARSCollectionObject = Object.extend(LCARSCollectionAbstract, {});
var LCARSCollection = $Class(LCARSCollectionObject, {});
