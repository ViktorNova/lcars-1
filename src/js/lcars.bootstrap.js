/**
 *	check dependencies
 */

/**
 * LCARS bootstrap abstract
 * @var	OBJECT	LCARSBootstrapAbstract	LCARS bootstrap abstract
 * @extends	LCARSObjectAbstract
 */
//var LCARSBootstrapAbstract = function () { if (typeof this.initialize == 'function') { this.initialize(arguments); } return (this); };
var LCARSBootstrapAbstract = {
		
	version					: 'dev',
		
	_used					: {},
	_config					: {},
	_bootstrap				: {},

	_bootstrapped			: false,
	
	checkDependencies		: null, // function ( $objects, $config ) {},
	
	__construct	: function ( $options ) {
		return(this);
	},

	run	: function ( $bootstrap, $config ) {
		return ( this.bootstrap( $bootstrap, $config ) );
	},

	bootstrap	: function ( $bootstrap, $config ) {
		if (LCARSDebug) { LCARSDebug.log('bootstrap init'); }
		
		if (typeof $bootstrap.bootstrap != 'undefined') {
			this._initConfig($bootstrap.bootstrap, $config);
		} else {
			this._initConfig($bootstrap, $config);
		}
		
		var rBoot = false;
		rBoot = this._loadBootstrap({
			appid		: $config.applicationId,
			subsystem	: 'frontend',
			debug		: $config.debug
		});
		if ( rBoot ) {
			
			this._bootstrap = Object.extend(
				this.getBootstrap().bootstrap,
				$LCARS.getInstance().getObject('applications', $config.applicationKey).bootstrap
			);
			//if (LCARSDebug) { LCARSDebug.debug ( /*$LCARS.getInstance().getObject('applications', $config.applicationKey), $bootstrap,*/ this.getBootstrap() ); }

			// bootstrap core components...
			if (typeof this.getBootstrap().libs == 'object') {
				this._bootstrapLibs( this.getBootstrap().libs );
			}
			if (typeof this.getBootstrap().lcars == 'object') {
				this._bootstrapLCARS( this.getBootstrap().lcars );
			}
			if (typeof this.getBootstrap().objects == 'object') {
				this._bootstrapObjects( this.getBootstrap().objects );
			}
			if (typeof this.getBootstrap().plugins == 'object') {
				this._bootstrapPlugins( this.getBootstrap().plugins );
			}
			
			// bootstrap backen and frontend components...
			if (typeof this.getBootstrap().backend == 'object') {
				this._bootstrapBackend( this.getBootstrap().backend );
			}
			
						// bootstrap application (startup) components...
			if (typeof this.getBootstrap().application == 'object') {
				this._bootstrapApplication( 
					this.getBootstrap().application,
					this.getConfig(),
					(typeof this.getBootstrap().screens == 'object') ? this.getBootstrap().screens : {},
					(typeof this.getBootstrap().modules == 'object') ? this.getBootstrap().modules : {}
				);
			}

			/* if (typeof this.getBootstrap().frontend == 'object') {
				this._bootstrapFrontend( this.getBootstrap().frontend );
			} */
			
			if (typeof this.getBootstrap().screens == 'object') {
				this._bootstrapFrontend( this.getBootstrap().screens, 'screen' );
			}
			
			if (typeof this.getBootstrap().modules == 'object') {
				this._bootstrapFrontend( this.getBootstrap().modules, 'module' );
			}

			if (LCARSDebug) { LCARSDebug.log('bootstrap completed'); }
			
		}
		return (this);
	},

	__bootstrapCheck : function ( $bootstrap ) {
		for (var i in $bootstrap) {
			//if ( (typeof $bootstrap[i] != function) && !($bootstrap[i] instanceof function) ) {
				
			//}
		}
		return (true);
	},
	
	use	: function ( params ) {
		var dependenciesAvailable = true;
		if (params.length && !params.resource && !params.key) {
			// array of parameter sets
			for (var i=0;i<params.length;i++) {
				if (typeof this.checkDependencies != 'function') {
					dependenciesAvailable = dependenciesAvailable && this._checkDependencies(params[i]);
				} else {
					dependenciesAvailable = dependenciesAvailable && this.checkDependencies(params[i]);
				}
			}
		} else {		
			// single parameter set
			if (typeof this.checkDependencies != 'function') {
				dependenciesAvailable = this._checkDependencies(params);
			} else {
				dependenciesAvailable = this.checkDependencies(params);
			}
		}
		return (dependenciesAvailable);
	},

	getConfig : function () {
		return this._config;
	},

	getBootstrap : function () {
		return this._bootstrap;
	},
	
	// micro bootstraps 

	_bootstrapBackend	: function ( params ) {
		if (LCARSDebug) { LCARSDebug.log('bootstrap backend components'); }
		var dependenciesAvailable = false;
		if (typeof this.checkDependencies != 'function') {
			dependenciesAvailable = this._checkDependencies(params);
		} else {
			dependenciesAvailable = this.checkDependencies(params);
		}
		if (dependenciesAvailable === true) {
			LCARSDebug.debug(params);
			//	application
			//		session/user
			//	screens
			//	apply user-settings
		} else {
			if (LCARSDebug) { LCARSDebug.error('bootstrapping backend: dependency failure!'); LCARSDebug.debug(dependenciesAvailable); }
		}
		return (this);
	},
	
	_bootstrapFrontend	: function ( params, type ) {
		if (LCARSDebug) { LCARSDebug.log('bootstrap frontend components '+String(type)); }
		if (params.length && !params.resource && !params.key) {
			// array of parameter sets
			for (i=0;i<params.length;i++) {
				if (typeof this.checkDependencies != 'function') {
					dependenciesAvailable = dependenciesAvailable && this._checkDependencies(params[i]);
				} else {
					dependenciesAvailable = dependenciesAvailable && this.checkDependencies(params[i]);
				}
			}
		} else {		
			// single parameter set
			if (typeof this.checkDependencies != 'function') {
				dependenciesAvailable = this._checkDependencies(params);
			} else {
				dependenciesAvailable = this.checkDependencies(params);
			}
		}
		return (this);
	},
	
	_bootstrapLibs	: function ( params ) {
		if (LCARSDebug) { LCARSDebug.log('bootstrap basic libraries'); }
		var dependenciesAvailable = this.use(params);
		if (dependenciesAvailable === true) {
			if (LCARSDebug) { LCARSDebug.log('bootstrap basic libraries - dependencies checked'); }
			this._initDependencies(params);
		} else {
			if (LCARSDebug) { LCARSDebug.error('bootstrapping basic libraries: dependency failure!'); LCARSDebug.debug(dependenciesAvailable); }
		}
		return (this);
	},
	
	_bootstrapLCARS	: function ( params ) {
		if (LCARSDebug) { LCARSDebug.log('bootstrap LCARS core components'); }
		var dependenciesAvailable = this.use(params);
		if (dependenciesAvailable === true) {
			if (LCARSDebug) { LCARSDebug.log('bootstrap LCARS core components - dependencies checked'); }
			//this._initDependencies(params);
		} else {
			if (LCARSDebug) { LCARSDebug.error('bootstrapping LCARS core components: dependency failure!'); LCARSDebug.debug(dependenciesAvailable); }
		}
		return (this);
	},
	
	_bootstrapApplication	: function ( params ) {
		if (LCARSDebug) { LCARSDebug.log('bootstrap application object (startup) components'); }
		var dependenciesAvailable = this.use(params);
		if (dependenciesAvailable === true) {
			if (LCARSDebug) { LCARSDebug.log('bootstrap application object (startup) components - dependencies checked'); }
			this._initDependencies(params);
		} else {
			if (LCARSDebug) { LCARSDebug.error('bootstrapping application object (startup) components: dependency failure!'); LCARSDebug.debug(dependenciesAvailable); }
		}
		return (this);
	},
	
	_bootstrapObjects	: function ( params ) {
		if (LCARSDebug) { LCARSDebug.log('bootstrap (special) object components'); }
		var dependenciesAvailable = this.use(params);
		if (dependenciesAvailable === true) {
			if (LCARSDebug) { LCARSDebug.log('bootstrap (special) object components - dependencies checked'); }
			this._initDependencies(params);
		} else {
			if (LCARSDebug) { LCARSDebug.error('bootstrapping (special) object components: dependency failure!'); LCARSDebug.debug(dependenciesAvailable); }
		}
		return (this);
	},
	
	_bootstrapPlugins	: function ( params ) {
		if (LCARSDebug) { LCARSDebug.log('bootstrap plugin components'); }
		var dependenciesAvailable = this.use(params);
		if (dependenciesAvailable === true) {
			if (LCARSDebug) { LCARSDebug.log('bootstrap plugin components - dependencies checked'); }
			this._initDependencies(params);
		} else {
			if (LCARSDebug) { LCARSDebug.error('bootstrapping plugin components: dependency failure!'); LCARSDebug.debug(dependenciesAvailable); }
		}
		return (this);
	},

	
	// init 
	_initConfig	: function ( $bootstrap, $config ) {
		this._bootstrap	= Object.extend(this._bootstrap, $bootstrap);
		this._config	= Object.extend(this._config, $config);
		return (this);
	},
	
	_initDependencies	: function ( params ) {
		var dependenciesAvailable = true;
		if (params.length && !params.init && !params.init) {
			// array of parameter sets
			for (i=0;i<params.length;i++) {
				dependenciesAvailable = dependenciesAvailable && this._createInitScript(params[i]);
			}
		} else if ( params.init ) {		
			// single parameter set
			dependenciesAvailable = dependenciesAvailable && this._createInitScript(params);
		}
		return (dependenciesAvailable);
	},
	
	_checkDependencies	: function ( params, loaded ) {
		if (params && params.name && !this._used[params.name]) {
			if (LCARSDebug) { LCARSDebug.log('check for dependency -'+String(params.name)+'...'); }
			if ( 
				(typeof window[params.name] != 'undefined') || 
				(typeof document[params.name] != 'undefined') 
			) { // $LCARS.getInstance().config.lcarsPrefix+
				this._used[params.name] = true;
				if (LCARSDebug) { LCARSDebug.log('dependency -'+String(params.name)+'- available'); }
				return (true);
			} else {
				if (LCARSDebug) { LCARSDebug.warn('dependency -'+String(params.name)+'- not found'); }
				if (LCARSDebug) { LCARSDebug.debug(window, document); }
				
			}
			if ( this.getConfig().autoload && !loaded ) {
				if (LCARSDebug) { LCARSDebug.warn('try autoloading dependency -'+String(params.name)+'-'); }
				if ( this._loadFile({
					type : params.type,
					key : $LCARS.getInstance().config.lcarsPrefix+params.name,
					name : params.name,
					resource : ( (params.js) ? params.js : ((params.css) ? params.css : ((params.resource) ? params.resource : '') ) )
				}) ) {
					//this._used[params.name] = true;
					return this._checkDependencies(params, true);
				}
				return (false);
			} else {
				if (LCARSDebug) { LCARSDebug.error('dependency -'+String(params.name)+'- not available'); }
				return (false);
			}
		}
		return (true);
	},
	
	_createScreens	: function ( params ) {
	},
	
	_createModules	: function ( params ) {
	},
	
	_createPanels	: function ( params ) {
	},
	
	_createInitScript	: function ( params ) {
		if ( (typeof params.init == 'string') && (params.init !== '') && (typeof params.type == 'string') && (params.type == 'script') ) {
			if (LCARSDebug) { LCARSDebug.log('create init dependency script -'+String(params.name)+'-'); }
			var eScript			= document.createElement(params.type);
			eScript.type		= "text/javascript";
			document.getElementsByTagName('head')[0].appendChild(eScript);
			eScript.innerHTML	= params.init;
			return (true);
		} else if ( (typeof params.init == 'function') && (typeof params.type == 'string') && (params.type == 'script') ) {
			if (LCARSDebug) { LCARSDebug.log('init dependency script method -'+String(params.name)+'-'); }
			return (params.init());
		} else {
			if (LCARSDebug) { LCARSDebug.warn('initializing dependency -'+String(params.name)+'- failed: no or invalid init script given'); }
			return (false);
		}
	},

	_loadFile	: function ( params ) {
		if ( (typeof params.resource == 'string') && (params.resource !== '') && !document.getElementById(params.key)) {
			if ( (typeof params.type == 'string') && params.type == 'script') {
				if (LCARSDebug) { LCARSDebug.log('load dependency script -'+String(params.name)+'-'); }
				var eScript		= document.createElement(params.type);
				eScript.id		= params.key;
				eScript.src		= params.resource;
				eScript.type	= "text/javascript";
				document.getElementsByTagName('head')[0].appendChild(eScript);
				//return ( this._checkDependencies(params, true) );
				return (true);
			} else if ( (typeof params.type == 'string') && params.type == 'link') {
				if (LCARSDebug) { LCARSDebug.log('load dependency link -'+String(params.name)+'-'); }
				var eStylesheet		= document.createElement(params.type);
				eStylesheet.id		= params.key;
				eStylesheet.rel		= "stylesheet";
				eStylesheet.type	= "text/javascript";
				eStylesheet.media	= "screen";
				eStylesheet.href	= params.resource;
				document.getElementsByTagName('head')[0].appendChild(eStylesheet);
				//return ( this._checkDependencies(params, true) );
				return (true);
			}
		} else if ( (typeof params.resource == 'string') && (params.resource !== '') && document.getElementById(params.key) ) {
			if (LCARSDebug) { LCARSDebug.warn('loading dependency -'+String(params.name)+'- failed: script element already present.'); }
			return (false);
		} else {
			if (LCARSDebug) { LCARSDebug.warn('loading dependency -'+String(params.name)+'- failed: no or invalid file resource given'); }
			return (false);
		}
	},
	
	_loadBootstrap	: function ( appParams ) {
		if (LCARSDebug) { LCARSDebug.log('load bootstrap'); }
		if ( !(appParams instanceof Object) && (typeof appParams.appid == 'string') ) { 
			LCARSDebug.error('loading bootstrap: invalid bootstrap options given...'); LCARSDebug.debug ( appParams ); 
			return (false);
		}
		if ( (typeof $LCARS.getInstance().config.applicationKey != 'string') || (trim($LCARS.getInstance().config.applicationKey) === '') ) {
			if (LCARSDebug) { 
				LCARSDebug.warn('loading bootstrap: invalid or no application key given, terminating bootstrap process!'); 
				//LCARSDebug.debug ( $LCARS.getInstance().config.applicationKey, $LCARS.getInstance().config ); 
			}
			return (false);
		}
		var oLoader = new LCARSXHR({
			mode: "sync",
			url: '/'+'_;;_'+'/'+ $LCARS.getInstance().config.applicationKey +'/bootstrap/',
			params : Object.extend(appParams, {}),
			/*complete : function ( response ) {},*/
			success : function ( response ) {
				if ( (String(response.responseText).toLowerCase().indexOf('lcarsexceptionscreen') >= 0) ||
						(response.responseJSON === false)	) {
					if (LCARSDebug) { LCARSDebug.error('loading bootstrap failed: ...'); LCARSDebug.debug ( response ); }
					document.body.innerHTML = response.responseText;
					oLoader.error = true;
				} else {
					if (LCARSDebug) { LCARSDebug.log ( 'loading bootstrap: OK' ); }
					var resultBootstrap = response.responseJSON.results;
					$LCARS.getInstance().setObject('applications', resultBootstrap.configs.application.key, resultBootstrap); 
					//if (LCARSDebug) { LCARSDebug.debug ( response.responseJSON ); }
				}
			},
			failure : function ( response ) {
				if (LCARSDebug) { LCARSDebug.error('loading bootstrap failed: ...'); LCARSDebug.debug ( response ); }
			}

		});
		oLoader.error = false;
		oLoader.execute();
		if ( oLoader.error ) return false;
		if (LCARSDebug) { LCARSDebug.log ( 'loading bootstrap completed' ); }
		return (this);
	}
	
};

/**
 * LCARS bootstrap object
 * @var	OBJECT	LCARSBootstrap	LCARS bootstrap class
 * @var	OBJECT	LCARSBootstrapObject	LCARS bootstrap plain object
 * @extends	LCARSBootstrapAbstract
 */
var LCARSBootstrapObject = Object.extend(LCARSBootstrapAbstract, {});
var LCARSBootstrap = $Class(LCARSBootstrapObject);
