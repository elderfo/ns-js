"use strict"

require("mocha");

var ns = require("../ns");
var assert = require("chai").assert;

describe("Ns", function() {

    describe("namespace", function() {
        it("should return empty object when object is not initialized", function() {
            var obj = ns.namespace("ns.tests.namespace.empty.object");
            assert.isObject(obj);
            assert.lengthOf(Object.keys(obj), 0);
        });

        it("should return object same object on subsequent calls", function(){
            var namespace = "ns.tests.namespace.notempty.object";
            var expected = ns.namespace(namespace);
            expected.test = "test";
            expected.testFunc = function() {};

            var actual = ns.namespace(namespace);

            assert.deepEqua;(actual, expected);
        });
    });

    describe("require", function() {
        it("should throw an exception when a required module does not exist", function() {
            var namespace = "ns.tests.namespace.require.whenModuleNotCreated.throws";

            assert.throws(function() {
               ns.require(namespace);
            });
        });

        it("should not throw an exception when required module exists", function() {
            var namespace = "ns.tests.namespace.require.whenModuleCreated.doesNotThrow";

            ns.namespace(namespace);

            assert.doesNotThrow(function() {
                ns.require(namespace);
            });
        });

        it("should return the created object", function() {
            var namespace = "ns.tests.namespace.require.whenModuleCreated.returns.expectedObject";
            var expected = ns.namespace(namespace);

            var actual = ns.require(namespace);

            assert.deepEqual(actual, expected);
        });
    });

});