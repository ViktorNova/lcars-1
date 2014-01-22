/*
 *	check dependencies
 */

/**
 * LCARS XML HTTP request object
 * @var	Object	LCARSXHRAbstract	LCARS XML HTTP request object
 */
var LCARSXHRAbstract = {
		
	config			: null,
	client			: null,
	request			: null,
	response		: null,
	responseText	: null,
	responseXML		: null,
	scope			: null,

	methods : ['get','post','put','update','delete'],
	
	defaults : {
		url			: '',
		params		: {},
		method		: 'post',
		mode		: 'async',
		complete	: function () {},
		success		: function () {},
		failure		: function () {},
		scope		: null
	},
	
	__construct : function ( oRequest ) {
		if (this.config === null) {
			this.config = this.defaults;
		} 
		this.config = Object.extend( this.config , ((typeof oRequest == 'object') ? oRequest : {}) );
		this.getClient();
		this.request = this.toRequest();
		return (this);
	},

	buildURL : function ( params ) {
		if (typeof params != 'object') { 
			return '';
		}
		if (typeof params.language == 'undefined') { 
			params.language = $LCARS.getInstance().config.language;
		}
		if (typeof params.module == 'undefined') { 
			params.module = 'default';
		}
		if (typeof params.controller == 'undefined') { 
			params.controller = 'index';
		}
		if (typeof params.action == 'undefined') { 
			params.action = 'index';
		}
		var aURL = [
			'/', String(params.language), 
			'/', String(params.module), 
			'/', String(params.controller), 
			'/', String(params.action), '/'
		];
		return aURL.join('');
	},

	toRequest : function ( _url, _params, _method, _callbacks ) {
		var options = this.config;
		if ( (typeof _url == 'string') ) { 
			options.url = _url; 
		}
		if (typeof _params == 'object') { 
			options.params = _params; 

		}
		if (!options.url || (options.url === '')) {
			options.url = this.buildURL(options.params);
		}
		if (this.methods.indexOf( String(_method).toLowerCase() ) != -1) { 
			options.method = String(_method).toLowerCase(); 
		}
		if (typeof _callbacks == 'object') { 
			if (typeof _callbacks.complete == 'function') { 
				options.complete = _callbacks.complete; 
			} 
			if (typeof _callbacks.success == 'function') { 
				options.success = _callbacks.success; 
			} 
			if (typeof _callbacks.failure == 'function') { 
				options.failure = _callbacks.failure; 
			}
		} else if (typeof _callbacks == 'function') {
			options.complete = _callbacks;
		}
		return options;
	},

	toResponse : function ( _statusCode, _statusText, _responseText, _responseXML, _headers ) {
		var text = trim(_responseText);
		var isJSON = false;
		if ( 
			((String(text).charAt(0) == '{') && (String(text).charAt(String(text).length-1) == '}')) ||
			((String(text).charAt(0) == '[') && (String(text).charAt(String(text).length-1) == ']')) 
		) {
			isJSON = true;
		}
		return ({
			statusCode : _statusCode || false,
			statusText : _statusText || false,
			responseText : _responseText || false,
			responseJSON : isJSON ? JSON.parse(stripTags(text) || "{}") : false,
			responseXML : _responseXML || false,
			headers : _headers || false
		});
	},

	_responseHandler : function ( oEvent ) {
		// ATTENTION: 'this' refers to XHR object !
		this.client = this.xhr.getClient();
		if (this.client !== null && this.client.readyState && this.client.readyState == 4) {
			LCARSDebug.info('XHR request completed: '+this.client.readyState+'');
			if (typeof this.xhr.config.complete == 'function') {
				this.xhr.config.complete(this.xhr.toResponse(
					this.client.status, 
					'code'+this.client.status,
					this.client.responseText,
					this.client.responseXML,
					{}
				));
			}
			if (this.client.status && this.client.status !== null && this.client.status == 200) {
				LCARSDebug.info('XHR request success: '+this.client.status /* +' '+this.client.responseText+'' */ );
				if ((this.client.responseXML !== null) && (this.client.responseText !== null)) {
					this.client.responseXML.loadXML(this.client.responseText);
				}
				if (typeof this.xhr.config.success == 'function') {
					this.xhr.config.success(this.xhr.toResponse(
						this.client.status, 
						'code'+this.client.status,
						this.client.responseText,
						this.client.responseXML,
						{}
					));
				}
			}
			if (this.client.status && this.client.status !== null && this.client.status >= 400) {
				LCARSDebug.error('XHR request failure: '+this.client.status /* +' '+this.client.responseText+'' */ );
				if ((this.client.responseXML !== null) && (this.client.responseText !== null)) {
					this.client.responseXML.loadXML(this.client.responseText);
				}
				if (typeof this.xhr.config.failure == 'function') {
					this.xhr.config.failure(this.xhr.toResponse(
						this.client.status, 
						'code'+this.client.status,
						this.client.responseText,
						this.client.responseXML,
						{}
					));
				}
			}
		}
	},
	
	getRequest : function () {
		if ((this.request !== null) && (typeof this.request == 'object')) {
			return (this.request);
		}
		return (false);
	},
	
	getClient : function () {
		if ((this.client !== null) && (typeof this.client == 'object')) {
			return (this.client);
		}
		var client = null;
		/**
		 * Die ActiveX-Bezeichner sind bei 5.x und 6.x/7.x unterschiedlich:
		 **/
		if (window.ActiveXObject) {
			try {
				// MSIE 6.x
				client = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					// MSIE 5.x
					client = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(exception) {
					client = null;
				}
			}
		/**
		 * ... hier ist es einheitlich:
		 */
		} else if (window.XMLHttpRequest) {
			// Safari, KHTML, Mozilla, Opera
			try {
				client = new XMLHttpRequest();
			} catch(e) {
				client = null;
			}
		}
		this.client = client;
		return (this.client) ? this.client : null;
	},
	
	_sendRequest : function ( queryString ) {
		var client	= this.getClient();
		if (!client) {
			return (false);
		}
		var request	= buildQueryString(this.getRequest().params);
		if (queryString) {
			request = String(queryString);
		} 
		if (client.readyState === 0) {
			var conf = this.getRequest();
			if (!conf) { LCARSDebug.error('invalid request configuration given'); }
			client.open(conf.method, conf.url, conf.async, conf.user, conf.password);
			client.onreadystatechange = this._responseHandler;
			client.xhr = this;
		}
			if ((typeof request == 'string') && (request !== '')) {
			if (this.getRequest().method != 'get') {
				client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				//client.setRequestHeader("Content-length", request.length);
			}
				client.send(request);
			} else {
			client.send(null);
		}
		return (client);
	},
	
	execute : function ( oRequest ) {
		var request = this.getRequest().params;
		if ( oRequest && ((typeof oRequest == 'object') || (typeof oRequest == 'string')) ) {
			request = oRequest;
		} else if ( oRequest ) {
			//throw ('invalid request object to execute');
			//return (false);
			//request = null;
		}
		if (typeof request == 'object') {
			request = buildQueryString(request);
		}
		this._sendRequest(request);
		return (this);
	},
	
	complete : function ( oResponse ) {},
	success : function ( oResponse ) {},
	failure : function ( oResponse ) {}
	
};
var LCARSXHRObject = Object.extend({}, LCARSXHRAbstract);
var LCARSXHR = $Class(LCARSXHRObject);
