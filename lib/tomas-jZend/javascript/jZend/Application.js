jZend.Application = Base.extend({
	request: {},
	controller: null,
	/**
	 * Runs the application, initializes all the controllers, helpers, etc
	 */
	run: function (request) {
		this.request = request;
		var moduleName = this.request.module;
		var controllerName = moduleName + '.' + this.request.controller + 'Controller';
		
		try {
			// creating module (if exists)
			if (typeof(eval(moduleName)) == 'undefined') {
				this.module = eval('new ' + moduleName + '()');
			} else {
				this.module = {};
			}
			
			// creating controller (if exists)
			if (!typeof(eval(controllerName)) == 'undefined')
				return;
			this.controller = eval('new ' + controllerName + '()');
			
			// setting request and running requested action 
			this.controller.setRequest(this.request);
			this.controller.setModule(this.module);
			this.controller.init();
			this.controller.takeAction(this.request.action);
		} catch (e) {
			if (e.stack)
				console.log(e.stack);
			else 
				console.log(e);
		}
	},
	
	/**
	 * Bootstrapper function, calls _init methods from current Bootstrap class
	 */
	bootstrap: function () {
		if (typeof(Bootstrap) != 'undefined') {
			this.bootstrap = new Bootstrap();
		} else {
			this.bootstrap = new jZend.Bootstrap();
		}
		for (func in this.bootstrap) {
			if (func.match(/^_init/)) {
				this.bootstrap[func]();
			}
		}
		return this;
	}
});
