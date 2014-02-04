/*jshint globalstrict: false*/
"use strict";
/*jshint globalstrict: true*/

var assert = require("assert");

describe("delite-element generator", function () {
	it("can be imported without blowing up", function () {
		var app = require("../app");
		assert(app !== undefined);
	});
});
