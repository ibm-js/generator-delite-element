define([
	"intern!object",
	"intern/chai!assert",
	"delite/register",
	"<%= package %>/<%= widgetName %>",
	"dojo/domReady!"
], function (registerSuite, assert, register) {
	var container;
	registerSuite({
		name: "",
		setup: function () {
			container = document.createElement("div");
			document.body.appendChild(container);
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
