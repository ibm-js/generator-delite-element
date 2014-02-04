define([
	"dcl/dcl",
	"delite/register",
	"delite/Widget",
	"delite/Invalidating"
], function (dcl, register, Widget, Invalidating) {

	var <%= widgetName %> = dcl([Widget, Invalidating], {

	});

	return register("<%= _.slugify(widgetName) %>", [HTMLElement, <%= widgetName %>]);
});