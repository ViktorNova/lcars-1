jZend.Controller = Base.extend({
	request: {},
	module: null,
	constructor: function () {
		this.view = new jZend.View();
	},
	init: function () {
		
	},
	takeAction: function (actionName) {
		this[actionName + 'Action']();
	},
	setRequest: function (request) {
		this.request = request;
	},
	setModule: function (module) {
		this.module = module;
	}
});
