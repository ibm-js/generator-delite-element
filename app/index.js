/*jshint globalstrict: false*/
"use strict";
/*jshint globalstrict: true*/
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var _ = require("underscore.string");


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

	// TODO: include dpointer?, which themes?, Invalidating? optional tag prefid (d-) ...

	this.prompt([
		{
			name: "elementName",
			message: "What do you want to call your delite widget element?"
		}
	], function (props) {
		this.elementName = _.slugify(props.elementName);
		this.widgetName = this.elementName;
		this.projectName = this.elementName;
		if (this.elementName.indexOf("-") === 1) {
			// we have a single letter prefix like d-component-name
			// we strip it for the widget name
			// otherwise we keep it
			this.widgetName = this.widgetName.substring(2);
		}
		this.projectName = this.widgetName;
		this.widgetName = _.classify(this.widgetName);
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

	this.template("./Element/Element.css", "./" + this.widgetName + "/themes/boostrap/" + this.widgetName + ".css");

};

DeliteElementGenerator.prototype.projectfiles = function projectfiles() {
	this.copy("jshintrc", ".jshintrc");
};
