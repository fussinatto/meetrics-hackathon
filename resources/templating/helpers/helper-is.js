(function () {
	module.exports.register = function (Handlebars, options) {


		Handlebars.registerHelper('is', function (value, test, options) {
			 if (value === test) {
		      return options.fn(this);
		    } else {
		      return options.inverse(this);
		    }
		});
	};

}).call(this);
