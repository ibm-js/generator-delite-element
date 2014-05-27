define(["intern!object", "intern/chai!assert", "intern/dojo/node!../app"],
	function (registerSuite, assert, app) {
	registerSuite({
		"load": function () {
			assert.isNotNull(app);
		}
	});
});
