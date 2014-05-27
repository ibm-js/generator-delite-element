define({
	loader: {
		baseUrl: ".."
	},
	
	suites: [ "generator-delite-element/tests/all" ],

	useLoader: {
		"host-node": "requirejs"
	},

	excludeInstrumentation: /./
});