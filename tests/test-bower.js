/* global process */
define(["intern!object", "intern/chai!assert", "intern/dojo/node!path", "intern/dojo/node!yeoman-generator",
		"intern/dojo/Deferred", "module", "intern/dojo/node!fs", "intern/dojo/node!rimraf", "intern/dojo/node!mkdirp"],
	function (registerSuite, assert, path, yo, Deferred, module, fs, rimraf, mkdirp) {
		function copyObj(obj) {
			var copy = {};
			for (var key in obj) {
				copy[key] = obj[key];
			}
			return copy;
		}
		function combinations(options, result) {
			var tobeadded = [];
			for (var i = 0; i < result.length; i++) {
				var f = copyObj(result[i]);
				f[options[0]] = false;
				tobeadded.push(f);
				result[i][options[0]] = true;
			}
			Array.prototype.splice.apply(result, [result.length, tobeadded.length].concat(tobeadded));
			if (options.length > 1) {
				combinations(options.slice(1), result);
			}
		}
		var opts = [
			"templated",
			"theming",
			"i18n",
			"pointer",
			"build"
		];
		var helpers = yo.test;
		var __filename = module.uri;
		var __dirname = path.dirname(__filename);
		var dir = path.resolve(path.join(__dirname, "temp"));

		function runTest(options) {
			var d = this.async(10000);
			var w = new Deferred();
			w.then(d.callback(function () {
				try {
					var json = fs.readFileSync(dir + "/bower.json");
					JSON.parse(json);
				} catch (e) {
					console.log(e);
					assert(false, "not all expected files have been generated");
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

		var result = [{}];
		var suite = {};
		combinations(opts, result);
		for (var i = 0; i < result.length; i++) {
			suite[JSON.stringify(result[i])] = function () {
				runTest.bind(this)(result[i]);
			};
		}
		registerSuite(suite);
	});
