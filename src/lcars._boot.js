/*
 * check dependencies
 */
if ( typeof LCARS != 'undefined' ) {
	throw "LCARS object is required to bootstrap application!";
}

addEvent(window, 'load', function () {

/**
 * LCARS application boot config/script
 */
(function($L, $BOOT, $LCARSUSERCONFIG, $LCARSUSERBOOTSTRAP) {

		//LCARSDebug.debug( $L );
		//LCARSDebug.debug( $BOOT );

	

	/* @begin config */
	var PLUGINS			= {},
		DEBUG			= true,
		AUTOSTART		= true,
		AUTOLOAD		= true,
		LCARSLIBS		= {},

		APPLICATIONID	= 'default',
		APPLICATIONNAME	= 'default',
		APPLICATIONKEY	= '_',

		CONTAINER		= document,
		CLASSNAME		= 'lcarsapp',

		LCARSPREFIX		= 'LCARS',
		
		NOT_FOUND		= {},
	    GLOBAL_ENV		= $L.config,
	    GLOBAL_LOADED,
	    BASECSS			= 'base', 
	    CSS				= 'css',
	    JS				= 'js',
	    CSSRESET		= 'cssreset',
	    CSSFONTS		= 'cssfonts',
	    CSSGRIDS		= 'cssgrids',
	    CSSBASE			= 'cssbase',
	    CSS_AFTER		= [CSSRESET, CSSFONTS, CSSGRIDS, 
	          		   'cssreset-context', 'cssfonts-context', 'cssgrids-context'],
	    LCARS_CSS		= ['reset', 'fonts', 'grids', BASECSS],
	    VERSION			= $L.version,
	    BASEPATH		= "/",
	    ROOT			= VERSION + '/build/',
	    CONTEXT			= '-context',
	
		ACTION			= 'action',
		API				= 'api',
		APPLICATION		= 'application',
	    COLLECTION		= 'collection',
	    CONTROLLER		= 'controller',
	    CORE			= 'core',
	    DEBUGMOD		= 'debug',
	    DEBUGPANEL		= 'debugpanel',
	    EXCEPTION		= 'exception',
	    FUNCTIONS		= 'functions',
	    HISTORY			= 'history',
	    LOG				= 'log',
	    LOGIN			= 'login',
	    MODULE			= 'module',
	    OBJECT			= 'object',
	    PANEL			= 'panel',
	    SCREEN			= 'screen',
	    SESSION			= 'session',
	    USER			= 'user',
	
		PLUGIN			= 'plugin',
		I18N			= {},
		
		DEFAULTACTION	= {
			module		: APPLICATIONID,
 		controller	: 'index',
	 	action		: 'index'
		},
		
		// basic LCARS configuration
		LCARSDEFAULTCONFIG = {
		    version		: VERSION,
		    root		: ROOT,
		    base		: BASEPATH + ROOT,
		    comboBase	: BASEPATH + ROOT + 'combo/?',
		    skin		: {
		        defaultSkin	: APPLICATIONID,
		        base		: CSS + '/skins/',
		        path		: 'skin.css',
		        after		: CSS_AFTER
		    },
		    language		: 'en',
	 	applicationId	: APPLICATIONID,
		    applicationKey	: APPLICATIONKEY,
	 	applicationName	: APPLICATIONNAME,
	 	autostart		: AUTOSTART,
	 	autoload		: AUTOLOAD,
	 	container		: CONTAINER,
	 	className		: CLASSNAME,
	 	lcarsPrefix		: LCARSPREFIX,
	 	debug			: DEBUG,
	 	host			: document.location.host,
	 	https			: document.location.protocol == 'https',
	 	requireLogin	: false,
	 	URL				: document.location.href,
		    // basic LCARS objects configuration
		    objects : {
		 	application	: {
		 		type	:	'backend',
		 		init	:	$L.initApplication
		 	},
		 		screens : {
		 		type	:	'frontend',
	 			action	: {
	 				action : 'mainscreen'
	 			}
	 		}
		    }
	    },
		// set LCARS configuration
	    LCARSCONFIG = Object.extend(LCARSDEFAULTCONFIG, $LCARSUSERCONFIG);

		/* @end config */
		if (!$L.config) {
			$L.config = {};
		}
	    $L.config = LCARSCONFIG;
	    
		/* @begin bootstrap config */		    
	    // default LCARS bootstrap config
	    LCARSDEFAULTBOOTSTRAP = {
	
		    // main bootstrap
		    bootstrap	: {
		        lcars	: {
		     	expound		: null,
		            optional	: [DEBUGMOD],
		            path		: null,
	         	plugins		: {},
		            requires	: [],
		            submodules	: {
		                'api': {
		                    requires: []
		 				//...
		                },
		                'core': {},
		                'log': {},
		                'exception': {},
		                'session': {},
		                'object': {},
		                'collection': {}
		            },
		            skinnable	: false,
		            supersedes	: []
		        },
		        objects	: {
		     	requires	: [ACTION,CONTROLLER,MODULE,APPLICATION],
	 			skinnable	: false
		        },
		        backend	: {
		     	requires	: [HISTORY,USER,LOGIN],
	 			skinnable	: false
		        },
		        frontend : {
		            optional	: [DEBUGMOD,DEBUGPANEL],
		     	requires	: [SCREEN,PANEL],
		     	skinnable	: false
		        },

			 	libs		: LCARSLIBS,
			        plugins : PLUGINS /*,
		        
		        all : {
		     	requires	: ['lib','lcars','objects','backend','frontent','plugins']
			        }*/
		 	//...
		    }
		};
		// set LCARS bootstrap config
		LCARSBOOTSTRAP = Object.extend(LCARSDEFAULTBOOTSTRAP, $LCARSUSERBOOTSTRAP);

	    $L.config.bootstrap = LCARSBOOTSTRAP;
		    
	/* @end bootstrap config */
	
	_path = function(dir, file, type) {
	    return dir + '/' + file + '-min.' + (type || CSS);
	},

	L     = $L.Lang;
	/*
	mods  = LCARSBOOTSTRAP, META.modules, i, bname, mname, contextname,

	// Create the metadata for both the regular and context-aware
	// versions of the YUI CSS foundation.
	for (i=0; i<LCARS_CSS.length; i=i+1) {
	    bname = LCARS_CSS[i];
	    mname = CSS + bname;

	    mods[mname] = {
	        type: CSS,
	        path: _path(mname, bname)
	    };

	    // define -context module
	    contextname = mname + CONTEXT;
	    bname = bname + CONTEXT;

	    mods[contextname] = {
	        type: CSS,
	        path: _path(mname, bname)
	    };

	    if (mname == CSSGRIDS) {
	        mods[mname].requires = [CSSFONTS];
	        mods[mname].optional = [CSSRESET];
	        mods[contextname].requires = [CSSFONTS + CONTEXT];
	        mods[contextname].optional = [CSSRESET + CONTEXT];
	    } else if (mname == CSSBASE) {
	        mods[mname].after = CSS_AFTER;
	        mods[contextname].after = CSS_AFTER;
	    }
	}
	*/

	//$L.config.meta = META;
	

	/* @begin bootsrapping LCARS */
	$BOOT.run(LCARSBOOTSTRAP, LCARSCONFIG);
	/* @end bootsrapping LCARS */
	
	//...log, info, warn, error, debug
	LCARSDebug.log('LCARS terminal frontend boot sequence completed');

	})( ($LCARS.getInstance()), (new LCARSBootstrap()), {}, {} );

}); // addEvent('load')
	

