// run grunt --help for help on how to run
// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
	environments: [
		{ browserName: "internet explorer", version: "11", platform: "Windows 8.1"},
		{ browserName: "internet explorer", version: "10", platform: "Windows 8"},
		{ browserName: "firefox", version: "28", platform: "Windows 7"},
		{ browserName: "chrome", version: "33", platform: "Windows 7"},
		{ browserName: "safari", version: "7", platform: "OS X 10.9"},
		{ browserName: "iphone", platform: "OS X 10.9", version: "7"}
	],

	// Whether or not to start Sauce Connect before running tests
	useSauceConnect: true,

	// Connection information for the remote WebDriver service. If using Sauce Labs, keep your username and password
	// in the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables unless you are sure you will NEVER be
	// publishing this configuration file somewhere
	webdriver: {
		host: "localhost",
		port: 4444
	},

	loader: {
		baseUrl: typeof window !== "undefined" ? "../../.." : "..",
		paths: {
			"dcl" : "<%= package %>/bower_components/dcl",
			"dojo": "<%= package %>/bower_components/dojo",<% if (!build) {%>
			"decor": "<%= package %>/bower_components/decor",
			"dpointer": "<%= package %>/bower_components/dpointer",
			"ecma402": "<%= package %>/bower_components/ecma402",
			"delite": "<%= package %>/bower_components/delite",
			"requirejs-dplugins": "<%= package %>/bower_components/requirejs-dplugins",
			"requirejs-text": "<%= package %>/bower_components/requirejs-text",
			"requirejs-domready": "tmp-elt/bower_components/requirejs-domready",
			"jquery": "tmp-elt/bower_components/jquery"<% } else { %>
			"decor-build": "<%= package %>/bower_components/decor-build",
			"dpointer-build": "<%= package %>/bower_components/dpointer-build",
			"ecma402-build": "<%= package %>/bower_components/ecma402-build",
			"delite": "<%= package %>/bower_components/delite-build",
			"delite-build": "<%= package %>/bower_components/delite-build"<% } %>
		}
	},

	useLoader: {
		"host-node": "requirejs",
		"host-browser": "../../../<%= package %>/bower_components/requirejs/require.js"
	},

	// Non-functional test suite(s) to run in each browser
	suites: [ "<%= package %>/tests/<%= widgetName %>" ],

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^(?:tests|dcl|requirejs.*|dpointer)\//
});
