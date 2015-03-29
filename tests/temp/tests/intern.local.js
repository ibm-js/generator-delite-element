// run grunt --help for help on how to run
define([
	"./intern"
], function (intern) {
	intern.useSauceConnect = false;

	intern.environments = [
		{ browserName: "firefox" },
		{ browserName: "safari" },
		{ browserName: "chrome" }
	];

	return intern;
});
