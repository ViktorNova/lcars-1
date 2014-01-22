

/**
 *	@package		JavaScript Browser application object
 * 
 *	@copyright		2010 P.AD. Werbeagentur <info@p-ad.de>
 *	@author			Björn Bartels <bb@p-ad.de>
 *	@created		08/2010
 *	@version		1.0
 */
function jApplicationAPI_Abstract ( oOptions, oPageAttributes, oPageModelConfig ) {
	
	// check for jQuery
	if (!jQuery) {
		throw "jQuery JavaScript framework is required!";
	}
	
	// set application options
	this.aObjectTypes		=	[];
	this.oOptions			=	jQuery.extend({}, oOptions || {});
	this.aObjectTypes		=	this.oOptions.aObjectTypes || ['carousel','tooltip','accordeon','modal','tabview','slideshow','player','special'];

	this.bDebug				=	false;
	if (this.oOptions.bDebug) {
		this.bDebug			=	this.oOptions.bDebug;
	}
	// create object registry
	this.oObjects			=	{};
	var oRegistry			=	{};
	jQuery(this.aObjectTypes).each(function(iIndex, sType) {
		oRegistry[String(sType)] = [];
	});
	this.oObjects			=	oRegistry;

	// create page attribute registry
	this.oPageAttributes	=	{};
	if (oPageAttributes) {
		for ( iAttr in oPageAttributes ) {
			if ( typeof oPageAttributes[iAttr] != 'function' ) {
				var isAction = String(iAttr).toLowerCase().indexOf('action') > -1 ;
				if (isAction) {
					this.oPageAttributes[iAttr] = String(oPageAttributes[iAttr]).replace(/\/json\//, '/shop/');
				} else {
					this.oPageAttributes[iAttr] = oPageAttributes[iAttr];
				}
			}
		}
		//this.oPageAttributes = oPageAttributes;
	} 
	// create property registry
	this.oMessageProperties	=	{};
	if ( (typeof this.oOptions.bAjaxLoadProperties != 'undefined') && (this.oOptions.bAjaxLoadProperties === true) ) {
		this.oMessageProperties = jApplicationAPI_Abstract.prototype.getMessagesProperties(this.oOptions.sJSPathPrefix);
	}

	// init pagemodel objects
	if ( typeof oPageModelConfig != 'undefined' ) {
		this.addPageModelObjects(oPageModelConfig);
	}
	
};

jApplicationAPI_Abstract.prototype = {
	
	/**
	 * applications global storage container
	 */
	oStorage : {},
/*
 * 
				if ( (typeof oTarget.action != 'undefined') && (String(oApplication.getSessionAppendix('sessionId')) != ') ) {
				*/	
	/**
	 *	get applications url session appendix
	 * 
	 *	@param		STRING	sPrefix
	 *	@param		STRING	sKey
	 *	@param		BOOLEAN	bNoQuery
	 *	@return		STRING
	 */
	getSessionAppendix : function ( sPrefix, sKey, bNoQuery, bNoEmptyKey ) {
		var sAppendixPrefix	= '';
		var sSessionId		= '';
		if ( (typeof sPrefix != 'undefined') && ( this.getAttribute(sPrefix) ) ) {
			sAppendixPrefix =  String(this.getAttribute(sPrefix));
		} else if ( (typeof sPrefix != 'undefined') && ( this.getProperty(sPrefix) ) ) { 
			sAppendixPrefix =  String(this.getProperty(sPrefix));
		} else if ( (typeof sPrefix != 'undefined') && (String(sPrefix) != '') ) {
			sAppendixPrefix = String(sPrefix);
		} else if ( ( (typeof sPrefix == 'undefined') || (String(sPrefix) == '') ) && ( this.getAttribute('sessionAppendix') ) ) {
			sAppendixPrefix =  String(this.getAttribute('sessionAppendix'));
		} else {
			//return ('');
		} 
		if ( (String(location.href).indexOf(sAppendixPrefix) > 0) ) {
			//return ('');
		}
		if ( (typeof sKey != 'undefined') && ( this.getAttribute(sKey) ) ) {
			sSessionId =  String(this.getAttribute(sKey));
		} else if ( (typeof sKey != 'undefined') && ( this.getProperty(sKey) ) ) {
			sSessionId =  String(this.getProperty(sKey));
		} else if ( (typeof sKey != 'undefined') && (String(sKey) != '') ) {
			sSessionId = String(sKey);
		} else if ( !bNoEmptyKey && ( (typeof sKey == 'undefined') || (String(sKey) == '') ) && ( this.getAttribute('sessionId') ) ) {
			sSessionId =  String(this.getAttribute('sessionId'));
		} else {
			return ('');
		}
		var sConj = ( 
			(!bNoQuery && (sAppendixPrefix != '')) ? 
				( ((String(location.href).indexOf('&amp;') <= 1)) ? ( ((String(location.href).indexOf('&') <= 1)) ? ( ((String(location.href).indexOf('?') <= 1)) ? '?' : '' ) : '&' ) : '&amp;' )
			: ''
		);
		var sAppendix = [sConj, sAppendixPrefix, '=', sSessionId].join('');
		return (sAppendix);
	},
	
	/**
	 *	add new object to object-registry
	 * 
	 *	@param		STRING		sType		object type name
	 *	@param		STRING		sSelector	element selector
	 *	@param		OBJECT		oSettings	object setting set
	 *	@param		BOOLEAN		bForce		force override of existing entry in registry (optional, default = false)
	 *	@returns	BOOLEAN
	 */
	addObject		:	function ( sType, sSelector, oSettings, bForce  ) {
//		if ( (Array(this.aObjectTypes).indexOf(String(sType)) < 0) ) {
//			return (false);
//		}
		if ( (typeof sSelector == 'undefined') || (sSelector == '') ) {
			return (false);
		}
		var bAlreadySet = false;
		jQuery(this.oObjects[String(sType)]).each(function(iIndex, oItem) { 
			if ( (typeof oItem.selector != 'undefined') && (oItem.selector == sSelector) ) {
				bAlreadySet = true;
			}
		});
		if ( (bAlreadySet === false) || (bForce === true) ) {
			this.oObjects[String(sType)][this.oObjects[String(sType)].length] = {
				type		:	String(sType),
				selector	:	sSelector,
				settings	:	oSettings,
				initialized	:	false
			};
		} else {
			return (false);
		}

		return (this);
	},
	
	/**
	 *	add pagemodel objects to registry
	 * 
	 *	@param		OBJECT	oPageModelConfig
	 *	@returns	jApplicationAPI_Abstract
	 */
	addPageModelObjects : function ( oPageModelConfig ) {
		for (sObject in oPageModelConfig) {
			if ( (this.aObjectTypes.indexOf(sObject) >= 0) && (String(sObject).toLowerCase() != "special") ) {
				var oPageModelObjectConfigs = oPageModelConfig[sObject];
				for (iConfig in oPageModelObjectConfigs) {
					var oPageModelObjectConfig = oPageModelObjectConfigs[iConfig];
					this.addObject (
						sObject,
						oPageModelObjectConfig.selector,
						oPageModelObjectConfig.options
					);
				}
			} else if ( (this.aObjectTypes.indexOf(sObject) >= 0) && (String(sObject).toLowerCase() == "special") ) {
				for (sSpecial in oPageModelConfig[sObject]) {
					var oSpecialConfigs = oPageModelConfig[sObject][sSpecial];
					for (iConfig in oSpecialConfigs) {
						var oSpecialConfig = oSpecialConfigs[iConfig];
						if ( !oSpecialConfig.options ) { oSpecialConfig.options = {}; }
						if ( !oSpecialConfig.options.specialName ) {
							oSpecialConfig.options.specialName = sSpecial;
						}
						this.addObject (
							"special",
							oSpecialConfig.selector,
							oSpecialConfig.options
						);
					}
				}
			}
		}
		return (this);
	},
	
	/**
	 *	save a set/object of application page attributes, overrides all other page attribute values
	 * 
	 *	@param		OBJECT	oAttributes
	 *	@returns	jApplicationAPI_Abstract
	 */
	setPageAttributes : function ( oAttributes ) {
		this.oPageAttributes = oAttributes;
		return (this);
	},
	
	/**
	 *	save named page attributes's value into the page attribute registry overriding old page attribute value
	 * 
	 *	@param		STRING	sKey	
	 *	@param		MIXED	mValue	
	 *	@returns	jApplicationAPI_Abstract
	 */
	setAttribute : function ( sKey, mValue ) {
		if ( (typeof sKey == 'undefined') || (sKey == '') ) {
			return (this);
		}
		if (typeof this.oPageAttributes == 'undefined') {
			this.oPageAttributes = {};
		}
		this.oPageAttributes[sKey] = mValue;
		return (this);
	},
	
	/**
	 *	get named page attributes's value from registry
	 * 
	 *	@param		STRING	sKey	name of page attribute to get
	 *	@returns	MIXED
	 */
	getAttribute : function ( sKey ) {
		if ( (typeof sKey == 'undefined') || (sKey == '') ) {
			return (null);
		}
		return (this.oPageAttributes[sKey]);
	},
	
	/**
	 *	save named prpoerty's value into the property registry
	 * 
	 *	@param		STRING	sKey
	 *	@param		STRING	mValue
	 *	@returns	jApplicationAPI_Abstract
	 */
	setProperty : function ( sKey, mValue ) {
		if ( (typeof sKey == 'undefined') || (sKey == '') ) {
			return (this);
		}
		if (typeof this.oMessagesProperies == 'undefined') {
			this.oMessagesProperies = {};
		}
		this.oMessagesProperies[sKey] = mValue;
		return (this);
	},
	
	/**
	 *	get named property from registry
	 * 
	 *	@param		STRING	sKey	name of property to get
	 *	@returns	MIXED
	 */
	getProperty : function ( sKey ) {
		if ( (typeof this.oMessagesProperies == 'undefined') || (typeof sKey == 'undefined') || (sKey == '')) {
			return (null);
		}
		return (this.oMessagesProperies[sKey]);
	},
	
	/**
	 *	load and parse server's 'messages.properties' file into an object of stored messages
	 * 
	 *	@param		STRING	sPath	path to 'messages.properties' file
	 *	@returns	OBJECT
	 */
	getMessagesProperties : function ( sPath ) {
		var mMessagesFile = jQuery.ajax({
			  url	:	String(sPath) + 'messages.properties',
			  async	:	false
		}).responseText;
		var oMessageProperties = this.parseMessagesProperties(mMessagesFile);
		this.oMessageProperties = oMessageProperties;
		return ( oMessageProperties );
	},

	
	/**
	 *	parse a (structured) string to split up into an object, e.g.
	 *	the string (e.g. file content):
	 *	<code>
	 * 		key_1 = value_1
	 * 		key_2 = value_2
	 * 		...
	 * 		key_n = value_n
	 *	</code>
	 *	will be parsed into an object like
	 *	<code>
	 * 		{
	 * 			'key_1'	:	'value_1',
	 * 			'key_1'	:	'value_1',
	 * 			...
	 * 			'key_n'	:	'value_n'
	 * 		}
	 *	</code>
	 * 
	 *	@param		STRING	sProperties		complete set of messages in one string, e.g. from 
	 *	@returns	OBJECT
	 */
	parseMessagesProperties : function ( sProperties ) {
		if ((sProperties == '') || (typeof sProperties == 'undefined')) {
			return ({});
		};
		var oProperties = {};
		var aProperties = String(sProperties).split("\n");
		jQuery.each(aProperties, function (iIndex, sLine) {
			var aLine = [];
			if ( (jQuery.trim(sLine) != '') && (jQuery.trim(sLine).indexOf('#') < 0) ) {
				aLine = jQuery.trim(sLine).split('=');
				oProperties[jQuery.trim(aLine[0])] = jQuery.trim(aLine[1]);
			}
		});
		return (oProperties);
	},	
	
	initECommerceServicesApi : function ( ) {
		if ( (typeof this.oAPI == 'undefined') && (typeof ECommerceServices != 'undefined') ) {
			this.oAPI = new ECommerceServices(new ECommerceConfig(
				((sJSONBaseURL) ? sJSONBaseURL : ''),
				((sSection) ? sSection : ''), 
				((sToken) ? sToken : ''), 
				((this.oPageAttributes.sessionId) ? this.oPageAttributes.sessionId : '')
			));
			this.oWarenkorb = {};
			var $this = this;
			var mTrigger = (String($this.oOptions.triggerWkAjaxRequest) != '') ? String($this.oOptions.triggerWkAjaxRequest) : false;
			if ( mTrigger && (jQuery(mTrigger).size() > 0) ) {
				this.oAPI.fetchWarenkorb(
					function ( mData ) {
						$this.oWarenkorb = ( mData );
					}
				);
			}

		} 
		
	},

	/**
	 *	execute extensions' objects instanciation and initialization when browser's 'DOM ready' event was fired,
	 *	looks for methods to initialize objects like the following precept:
	 * 
	 *	where sFuncName = 'init'+capitalize(sType) (e.g. 'initCarousel') find 
	 *	1. this[sFuncName]	or
	 *	2. jQuery[String(sType).toLowerCase()]	or
	 *	3. document[sFuncName]	or
	 *	4. window[sFuncName]
	 * 
	 *	if none of the above is found an exception is thrown!
	 * 
	 *	@returns	jApplicationAPI_Abstract
	 */
	run : function () {
		var oApplication = this;
		//jQuery(document).ready(function ( oEvent ) {
			oApplication.initECommerceServicesApi();
			jQuery.each(oApplication.oObjects, function(sType, aObjects) {
				if (aObjects.length > 0) {
					var sFuncName	=	'init'+capitalize(sType);
					var fMethod		=	null;
					if ( (typeof oApplication[sFuncName] == 'function') ) {
						fMethod		=	oApplication[sFuncName];
					} else if ( (typeof jQuery[String(sType).toLowerCase()] == 'function') ) {
						fMethod		=	jQuery[String(sType).toLowerCase()];
					} else if ( (typeof document[sFuncName] == 'function') ) {
						fMethod		=	document[sFuncName];
					} else if ( (typeof window[sFuncName] == 'function') ) {
						fMethod		=	window[sFuncName];
					} else {
						if (oApplication.bDebug) throw ( 'Could not find any method to initialize object of type "'+ (sType) +'" !' );
					}
					
					if ( (typeof fMethod == 'function') ) {
						jQuery.each(aObjects, function(iIndex, oConfig) {
							if (jQuery(oConfig.selector).size() > 0) {
								var mResult = fMethod(
									oApplication,
									oConfig.selector,
									oConfig.settings
								);
								if (mResult !== false) {
									oApplication.oObjects[sType][iIndex].initialized	=	true;
									oApplication.oObjects[sType][iIndex].object			=	mResult;
								}
							}
						});
					}
				}
			});
		//});
		return (this);
	}
	
};

var oAppDebug = {};

