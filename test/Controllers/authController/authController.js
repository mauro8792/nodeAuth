"use strict";

const { expect } = require("chai");

const util = require("../../../Controllers/authController/auth");

//
// AUTOR LEEOOOO
//
//
describe("Geenrar token", function () {
    describe("generando token", function () {

        it("Randon string default length", function () {
            const str = util.Token();
            expect(str).to.exist;
            expect(str).to.be.an("string");
            expect(str).to.be.length(10);
        });

        it("Randon string generate 28 chars", function () {
            const str = util.Token(28);
            expect(str).to.exist;
            expect(str).to.be.an("string");
            expect(str).to.be.length(28);
        });

    });
});