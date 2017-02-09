
module.exports = {
	options: {
		transform: [
			[
				"babelify", {
					"stage": 0
				}
			]
		]
	},
	vendor: {
		src: ['<%= paths.src %>/js/vendor/*'],
		dest: '<%= paths.dev %>/js/vendor.js',
		options: {
			debug: false,
			external:  null  // Reset this here because it's not needed 
		}
	},
	libs: {
	   src: ['<%= paths.src %>/js/vendor/*'],
		dest: '<%= paths.dev %>/js/vendor.js'
	},

	dev: {
		options: {

			watch: true
		},
		files: {
			'<%= paths.dev %>/js/main.js': '<%= paths.src %>/js/main.js'
		}
	},
	dist: {
		files: {
			'<%= paths.dev %>/js/main.js': '<%= paths.src %>/js/main.js'
		}
	}
};