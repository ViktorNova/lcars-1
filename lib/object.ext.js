
Object.createClass = function ( oBaseObject ) {
	
	var oClassObject = function ( oOptions ) {
		
		if (typeof oOptions == 'undefined') { 
			oOptions	=	{};
		}
		this.oOptions	=	{};
		for ( oOption in oOptions ) {
			this.oOptions[oOption]	=	oOptions[oOption];
		}
		
		for ( oOption in this.oOptions ) {
			if (oOption != 'oOptions') {
				this[oOption] = this.oOptions[oOption];
			}
			
		}
		
		if (typeof this['__super'] != 'function') { 
			this['__super'] = function () {
				var oThis = this;
				for ( oProperty in this.prototype ) {
					oThis[oProperty] = this[oProperty];
				}
				return (oThis);
			};
		}
		
		if (typeof this['__destroy'] != 'function') { 
			this['__destroy'] = function () {
				for ( oProperty in this ) {
					this[oProperty] = NULL;
				}
			};
		}
		
		if (typeof this['__extend'] != 'function') { 
			this['__extend'] = function ( oObject ) {
				if (typeof oObject != 'undefined') {
					for ( oProperty in oObject ) {
						this[oProperty] = oObject[oProperty];
					}
				}
				return (this);
			};
		}

		if (typeof this['__construct'] == 'function') { 
			this['__construct'].apply(this, [this.oOptions]);
		} else {
			this['__construct'] = function () {
				return (this);
			};
		}

		return ((this));
	};
	
	if ( (typeof oBaseObject == 'undefined') ) { 
		oBaseObject = {};
	}
	if ( (typeof oBaseObject == 'object') ) { //  || (typeof oBaseObject == 'function') ) {
		oClassObject.$super		=	oClassObject.prototype.$super		=	oBaseObject;
	} else if ( (typeof oBaseObject == 'function') ) {
		oClassObject.$super		=	oClassObject.prototype.$super		=	oBaseObject().__super.apply(oBaseObject);
	} else {
		oClassObject.$super		=	oClassObject.prototype.$super		=	{};
	}
	
	//oClassObject.$super	=	oClassObject.prototype.$super	=	{};
	for ( oProperty in oBaseObject ) {
		if ( (oProperty != '$super') && (oProperty != 'prototype') ) {
			oClassObject[oProperty]			=	oClassObject.prototype[oProperty]			=	oBaseObject[oProperty];
			oClassObject.$super[oProperty]	=	oClassObject.prototype.$super[oProperty]	=	oBaseObject[oProperty];
		}
		
	}
	
	return (oClassObject);
};

var $Class = function ( oBaseClass ) {
	if (typeof Object.createClass == 'function') {
		return ( Object( Object.createClass(oBaseClass) ) );
	} else {
		return (null);
	}
};
