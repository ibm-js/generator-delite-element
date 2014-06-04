/*global module */
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			src: [
				"*.js",
				"tests/*.js"
			],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		intern: {
			all: {
				options: {
					config: "tests/intern",
					reporters: []
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks("intern");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	// Aliases
	grunt.registerTask("jsdoc", "jsdoc-amddcl");

	// Testing.
	// Always specify the target e.g. grunt test:remote, grunt test:remote
	// then add on any other flags afterwards e.g. console, lcovhtml.
	var testTaskDescription = "Run this task instead of the intern task directly! \n" +
		"Always specify the test target e.g. \n" +
		"grunt test\n" +
		"Add any optional reporters via a flag e.g. \n" +
		"grunt test:console\n" +
		"grunt test:lcovhtml\n" +
		"grunt test:console:lcovhtml";
	grunt.registerTask("test", testTaskDescription, function () {
		function addReporter(reporter) {
			var property = "intern.all.options.reporters",
				value = grunt.config.get(property);
			if (value.indexOf(reporter) !== -1) {
				return;
			}
			value.push(reporter);
			grunt.config.set(property, value);
		}

		if (this.flags.lcovhtml) {
			addReporter("lcovhtml");
		}

		if (this.flags.console) {
			addReporter("console");
		}
		grunt.task.run("intern:all");
	});
};