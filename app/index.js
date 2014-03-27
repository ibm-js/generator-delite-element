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
		var self = this;
		this.installDependencies({ 
			skipInstall: options["skip-install"],
			callback: function () {
				console.log("Dependencies have been installed, point your browser to "+self.package+"/samples/"+self.widgetName+".html to run a simple sample showing your element");
			}
		});
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(DeliteElementGenerator, yeoman.generators.Base);

DeliteElementGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	// TODO:  which themes?, extend a deliteful widget?  Grunt

	this.prompt([
		{
			name: "package",
			message: "What is the name of your delite widget element package?",
			default: this.appname
		},
		{
			name: "elementName",
			message: "What do you want to call your delite widget element?",
			default: this.appname+"-element"
		},
		{
			type: "confirm",
			name: "templated",
			message: "Would you like your delite element to be built on a template?",
			default: true
		},
		{
			type: "confirm",
			name: "i18n",
			message: "Will your delite element require string internationalization?",
			default: true
		},
		{
			type: "confirm",
			name: "pointer",
			message: "Will your delite element require pointer management?",
			default: false
		}
	], function (props) {
		this.package = props.package;
		this.elementName = _.slugify(props.elementName);
		this.widgetName = this.elementName;
		if (this.elementName.indexOf("-") === 1) {
			// we have a single letter prefix like d-component-name
			// we strip it for the widget name
			// otherwise we keep it
			this.widgetName = this.widgetName.substring(2);
		}
		this.widgetName = _.classify(this.widgetName);
		this.templated = props.templated;
		this.i18n = props.i18n;
		this.pointer = props.pointer;
		cb();
	}.bind(this));
};

DeliteElementGenerator.prototype.generateElement = function app() {
	this.packge = "";
	this.mkdir("tests");
	this.mkdir("docs");
	this.mkdir(this.widgetName + "/themes/bootstrap");

	// this.template("Gruntfile.js", "Gruntfile.js");
	if (this.templated) {
		this.template("_Element.html", this.widgetName + "/" + this.widgetName + ".html");
		this.template("_Element.js.templated", this.widgetName + ".js");
	} else {
		this.template("_Element.js.hardcoded", this.widgetName + ".js");
	}
	this.template("_package.json", "package.json");
	this.template("_bower.json", "bower.json");
	this.template("_Element.css", this.widgetName + "/themes/bootstrap/" + this.widgetName + ".css");
	//this.template("_Test.js", "tests/" + this.widgetName + ".js");
	this.template("_Sample.html", "samples/" + this.widgetName + ".html");
	if (this.i18n) {
//		this.mkdir(this.widgetName + "/nls/en");
		this.mkdir(this.widgetName + "/nls/fr");
		this.copy("messages.js", this.widgetName + "/nls/messages.js");
		this.copy("messages.fr.js", this.widgetName + "/nls/fr/messages.js");

	}
};

DeliteElementGenerator.prototype.projectfiles = function projectfiles() {
	this.copy("jshintrc", ".jshintrc");
};
