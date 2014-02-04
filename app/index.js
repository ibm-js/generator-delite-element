/*jshint globalstrict: false*/
"use strict";
/*jshint globalstrict: true*/
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");


var DeliteElementGenerator = module.exports = function DeliteElementGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on("end", function () {
		this.installDependencies({ skipInstall: options["skip-install"] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(DeliteElementGenerator, yeoman.generators.Base);

DeliteElementGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{
			name: "widgetName",
			message: "What do you want to call your delite widget?"
		}
	];

	// TODO: include dpointer?, which themes?, Invalidating? ...

	this.prompt(prompts, function (props) {
		this.widgetName = props.widgetName;

		cb();
	}.bind(this));
};

DeliteElementGenerator.prototype.app = function app() {
	this.mkdir("tests");
	this.mkdir("docs");
	this.mkdir(this.widgetName);
	// this.template("Gruntfile.js", "Gruntfile.js");
	this.template("Element.js", this.widgetName + ".js");

	this.template("_package.json", "package.json");
	this.template("_bower.json", "bower.json");

};

DeliteElementGenerator.prototype.projectfiles = function projectfiles() {
	this.copy("editorconfig", ".editorconfig");
	this.copy("jshintrc", ".jshintrc");
};
