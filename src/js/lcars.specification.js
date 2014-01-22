/**
 * LCARS Specification abstract
 * @var	OBJECT	LCARSSpecificationAbstract	LCARS Specification abstract
 * @extends	LCARSObject
 */
var LCARSSpecificationAbstract = {

	_parameters				: {
	},
	
	_specifications			: {
	},
	
	_security : {
	},
	
	__construct	: function ( $specifications, $parameters ) {
		if (LCARSDebug) { LCARSDebug.log('creating Specification'); }
		this.setSpecifications( $specifications );
		this.setParameters( $parameters );
		return(this);
	},

	initiate	: function ( $parameters ) {
		if (LCARSDebug) { LCARSDebug.log('initating Specification'); }
		
		if (typeof $parameters == 'object') {
			this.setParameters($parameters);
		}
		
		

		if (LCARSDebug) { LCARSDebug.log('Specification initiated'); }
		return (this);
	},

	setParameters	: function ( $parameters, reset ) {
		this._parameters	= Object.extend(((reset) ? {} : this._parameters), $parameters);
		if (LCARSDebug) { LCARSDebug.log('setting new parameters'); }
		return (this);
	},
		
	setParameter	: function ( $name, $parameter, reset ) {
		if ($name === '') {
			if (LCARSDebug) { LCARSDebug.warn('unable to set unnamed parameter'); }
		}
		this._parameters[$name]	= Object.extend(
			( (reset && (typeof this._parameters[$name] == 'undefined')) ? {} : this._parameters[$name] ), 
			$parameter 
		);
		if (LCARSDebug) { LCARSDebug.log('setting new parameter "'+$name+'"'); }
		return (this);
	},
		
	setSpecifications	: function ( $specifications, reset ) {
		this._specifications	= Object.extend(((reset) ? {} : this._specifications), $specifications);
		if (LCARSDebug) { LCARSDebug.log('setting new specifications'); }
		return (this);
	},
		
	setSpecification	: function ( $name, $specification, reset ) {
		if ($name === '') {
			if (LCARSDebug) { LCARSDebug.warn('unable to set unnamed specification'); }
		}
		this._specifications[$name]	= Object.extend(
			( (reset && (typeof this._specifications[$name] == 'undefined')) ? {} : this._specifications[$name] ) , 
			$specification 
		);
		if (LCARSDebug) { LCARSDebug.log('setting new specification "'+$name+'"'); }
		return (this);
	},
		
	getParameter : function ( $name ) {
		return ( 
			(typeof this._parameters[$name] != 'undefined') ? 
					this._parameters[$name] : this._parameters 
		);
	},
	
	getSpecification : function ( $name ) {
		return ( 
			(typeof this._specifications[$name] != 'undefined') ? 
					this._specifications[$name] : this._specifications 
		);
	}
	
};

/**
 * LCARS Specification object
 * @var	OBJECT	LCARSSpecification	LCARS Specification object
 * @extends	LCARSSpecificationAbstract
 */
var LCARSSpecificationObject = Object.extend(LCARSSpecificationAbstract, {});
var LCARSSpecification = $Class(LCARSSpecificationObject);
