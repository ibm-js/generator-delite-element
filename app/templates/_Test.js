define([
	"intern!object",
	"intern/chai!assert",
	"intern/node_modules/dojo/Deferred"<% if (build) { %>,
	"delite-build/layer",
	"ecma402-build/layer"<% } %>
], function (registerSuite, assert, Deferred) {
	var container, register;
	registerSuite({
		name: "",
		setup: function () {
			var dfd = new Deferred();
			require(["delite/register", "<%= package %>/<%= widgetName %>", "requirejs-domready/domReady!"], function (r) {
				register = r;
				dfd.resolve();
			});
			container = document.createElement("div");
			document.body.appendChild(container);
			return dfd.promise;
		},
		"default": function () {
			var widget = register.createElement("<%= elementName %>");
			assert.strictEqual(widget.value, "");
		},
		"set" : function () {
			var widget = register.createElement("<%= elementName %>");
			widget.value = "The Title";
			assert.strictEqual(widget.value, "The Title");
		},
		teardown: function () {
			container.parentNode.removeChild(container);
		}
	});
});
