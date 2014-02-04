define([
	"dcl/dcl",
	"delite/register",
	"delite/Widget",
	"delite/Invalidating",
	"delite/themes/load!./<%= widgetName %>/{{theme}}/Button_css"
], function (dcl, register, Widget, Invalidating) {

	var <%= widgetName %> = dcl([Widget, Invalidating], {
		baseClass: "<%= elementName %>"
	});

	return register("<%= elementName %>", [HTMLElement, <%= widgetName %>]);
});