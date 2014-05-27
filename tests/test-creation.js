define(["intern!object", "intern/chai!assert", "intern/dojo/node!path", "intern/dojo/node!yeoman-generator",
		"intern/dojo/Deferred", "module"],
	function (registerSuite, assert, path, yo, Deferred, module) {
	var helpers = yo.test;
	var __filename = module.uri;
	var __dirname = path.dirname(__filename);

	registerSuite({
		"create": function () {
			var d = this.async(10000);
			var w = new Deferred();
			var expected = [
				// add files you expect to exist here.
				".jshintrc"
			];
			w.then(d.callback(function () {
				try {
					yo.assert.file(expected);
				} catch (e) {
					assert(false, "not all expected files have been generated");
				}
			}));
			helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
				if (err) {
					d.reject(err);
				}
				try {
					var app = helpers.createGenerator("delite-element:app", ["../../app"]);
				} catch (e) {
					d.reject(e);
				}
				app.log = function () {};
				//console.error = function () {};
		//		console.log = function() {};

				helpers.mockPrompt(app, {
					"pointer": true
				});
				app.options["skip-install"] = true;
				app.run(function () {
					w.resolve();
				});
			});
		}
	});
});
