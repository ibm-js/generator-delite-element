/* global process */
define(["intern!object", "intern/chai!assert", "intern/dojo/node!path", "intern/dojo/node!yeoman-generator",
		"intern/dojo/Deferred", "module", "intern/dojo/node!rimraf", "intern/dojo/node!mkdirp"],
	function (registerSuite, assert, path, yo, Deferred, module, rimraf, mkdirp) {
		var helpers = yo.test;
		var __filename = module.uri;
		var __dirname = path.dirname(__filename);
		var dir = path.resolve(path.join(__dirname, "temp"));

		function runTest(name, expected, notexpected, options) {
			var d = this.async(10000);
			var w = new Deferred();
			w.then(d.callback(function () {
				try {
					yo.assert.file(expected);
				} catch (e) {
					console.log(e);
					assert(false, "not all expected files have been generated");
				}
				try {
					yo.assert.noFile(notexpected);
				} catch (e) {
					assert(false, "some none expected files have been generated");
				}
			}));
			var parentDir = path.resolve(dir, "..");
			process.chdir(parentDir);
			rimraf(dir, function (err) {
				if (err) {
					d.reject(err);
				}
				mkdirp(dir, function (err) {
					if (err) {
						d.reject(err);
					}
					process.chdir(dir);
					var app;
					try {
						app = helpers.createGenerator("delite-element:app", ["../../app"]);
					} catch (e) {
						d.reject(e);
					}
					app.log = function () {
					};
					helpers.mockPrompt(app, options);
					app.options["skip-install"] = true;
					app.run(function () {
						w.resolve();
					});
				});
			});
		}

		registerSuite({
			"pointer": function () {
				runTest.bind(this)("temp", [
					// add files you expect to exist here.
					".jshintrc",
					"bower.json",
					"package.json",
					"TempElement.js",
					"samples/TempElement.html",
					"TempElement/css/TempElement.css",
					"TempElement/nls/messages.js",
					"TempElement/nls/fr/messages.js",
					"TempElement/TempElement.html"
				], [], {
					"pointer": true
				});
			},
			"notemplate": function () {
				runTest.bind(this)("template", [
					// add files you expect to exist here.
					".jshintrc",
					"bower.json",
					"package.json",
					"TempElement.js",
					"samples/TempElement.html",
					"TempElement/css/TempElement.css",
					"TempElement/nls/messages.js",
					"TempElement/nls/fr/messages.js"
				], [
					"TempElement/TempElement.html"
				], {
					"templated": false
				});
			},
			"noi18n": function () {
				runTest.bind(this)("nls", [
					// add files you expect to exist here.
					".jshintrc",
					"bower.json",
					"package.json",
					"TempElement.js",
					"samples/TempElement.html",
					"TempElement/css/TempElement.css",
					"TempElement/TempElement.html"
				], [
					"TempElement/nls/messages.js",
					"TempElement/nls/fr/messages.js"
				], {
					"i18n": false
				});
			}
		});
	});
