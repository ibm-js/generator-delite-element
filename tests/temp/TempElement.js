define([
	"delite/register",
	"delite/Widget",
	"delite/handlebars!./TempElement/TempElement.html",
    "requirejs-dplugins/i18n!./TempElement/nls/messages",
    "requirejs-dplugins/css!./TempElement/css/TempElement.css"
], function (register, Widget, template, messages) {
	return register("temp-element", [HTMLElement, Widget], {
		baseClass: "temp-element",
		nls: messages,
		value: "",
		template: template
	});
});