/*global module, __dirname*/
/*jshint globalstrict: false*/
"use strict";
/*jshint globalstrict: true*/
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var _ = require("underscore.string");


var DeliteElementGenerator = module.exports = function DeliteElementGenerator(args, options) {
	yeoman.generators.Base.apply(this, arguments);

	this.on("end", function () {
		var self = this;
		this.installDependencies({
			skipInstall: options["skip-install"],
			callback: function () {
				self.log("Dependencies have been installed, point your browser to " +
						self.appname + "/samples/" + self.widgetName +
						".html to run a simple sample showing your element, or run selenium and type " +
						"grunt test:local to launch unit testing");
			}
		});
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(DeliteElementGenerator, yeoman.generators.Base);

DeliteElementGenerator.prototype.askForMain = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	this.log(this.yeoman);

	// TODO:  which themes?, extend a deliteful widget?  docs skeleton

	this.prompt([
		{
			name: "package",
			message: "What is the name of your delite widget element package?",
			default: this.appname.indexOf(" ") !== -1 ? _.slugify(this.appname) : this.appname
		}
	], function (props) {
		this.package = props.package;
		cb();
	}.bind(this));
};

DeliteElementGenerator.prototype.askMore = function askMore() {
	var cb = this.async();
	var stylesheetFormats = ["css", "less"];

	this.prompt([
		{
			name: "elementName",
			message: "What do you want to call your delite widget element (must contain a dash)?",
			default: (this.package.indexOf(" ") !== -1 ? _.slugify(this.package) : this.package) + "-element",
			validate: function (value) {
				if (value.indexOf("-") !== -1) {
					return true;
				} else {
					return "element name must contain a dash (-)";
				}
			}
		},
		{
			type: "confirm",
			name: "templated",
			message: "Would you like your delite element to be built on a template?",
			default: true
		},
		{
			type: "confirm",
			name: "theming",
			message: "Would you like your delite element to providing theming capabilities?",
			default: false
		},
		{
			type: "confirm",
			name: "i18n",
			message: "Will your delite element require string translations?",
			default: true
		},
		{
			type: "confirm",
			name: "ecma402",
			message: "Will your delite element require number, currency... internationalized formatting?",
			default: false
		},
		{
			type: "confirm",
			name: "pointer",
			message: "Will your delite element require pointer management?",
			default: false
		},
		{
			type: "confirm",
			name: "build",
			message: "Do you want to use build version of delite package (instead of source version)?",
			default: true
		},
		{
			type: "confirm",
			name: "watch",
			message: "Do you want the Grunt file to include watch & livereload?",
			default: true
		},
		{
			type: "list",
			name: "stylesheetFormat",
			message: "Would you like to use CSS or LESS?",
			choices: stylesheetFormats
		}
	], function (props) {
		this.elementName = _.slugify(props.elementName);
		this.widgetName = this.elementName;
		if (this.elementName.indexOf("-") === 1) {
			// we have a single letter prefix like d-component-name
			// we strip it for the widget name
			// otherwise we keep it
			this.widgetName = this.widgetName.substring(2);
		}
		this.widgetName = _.classify(this.widgetName);
		this.build = props.build;
		this.templated = props.templated;
		this.theming = props.theming;
		this.i18n = props.i18n;
		this.ecma402 = props.ecma402;
		this.pointer = props.pointer;
		this.watch = props.watch;
		this.stylesheetFormat = props.stylesheetFormat || "css";
		cb();
	}.bind(this));
};

DeliteElementGenerator.prototype.generateElement = function app() {
	var stylesheetPath = this.theming ? "/themes/bootstrap/" : "/" + this.stylesheetFormat + "/";

	if (this.templated) {
		this.template("_Element.html", this.widgetName + "/" + this.widgetName + ".html");
		this.template("_Element.js.templated", this.widgetName + ".js");
	} else {
		this.template("_Element.js.hardcoded", this.widgetName + ".js");
	}
	this.template("_package.json", "package.json");
	this.template("_bower.json", "bower.json");
	this.template("_README.md", "README.md");
	this.template("_Element." + this.stylesheetFormat, this.widgetName +
		stylesheetPath + this.widgetName + "." + this.stylesheetFormat);
	this.template("_Test.js", "tests/" + this.widgetName + ".js");
	this.template("_intern.js", "tests/intern.js");
	this.copy("intern.local.js", "tests/intern.local.js");
	this.template("_Gruntfile.js", "Gruntfile.js");
	this.template("_Sample.html", "samples/" + this.widgetName + ".html");
	if (this.i18n) {
		this.mkdir(this.widgetName + "/nls/fr");
		this.copy("messages.js", this.widgetName + "/nls/messages.js");
		this.copy("messages.fr.js", this.widgetName + "/nls/fr/messages.js");
	}
};

DeliteElementGenerator.prototype.projectfiles = function projectfiles() {
	this.copy("jshintrc", ".jshintrc");
};