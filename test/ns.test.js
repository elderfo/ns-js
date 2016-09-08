"use strict"

require("mocha");

var ns = require("../ns");
var assert = require("chai").assert;

describe("Ns", function () {

    var invalidNamespaceException = "A namespace is required";

    describe("namespace", function () {
        it("should return empty object when object is not initialized", function () {
            var obj = ns.namespace("ns.tests.namespace.empty.object");
            assert.isObject(obj);
            assert.lengthOf(Object.keys(obj), 0);
        });

        it("should return object same object on subsequent calls", function () {
            var namespace = "ns.tests.namespace.notempty.object";
            var expected = ns.namespace(namespace);

            expected.test = "test";

            expected.testFunc = function () {
            };

            var actual = ns.namespace(namespace);

            assert.deepEqual(actual, expected);
        });

        it("should throw exception when no namespace is specified", function () {
            assert.throws(function () {
                ns.namespace();
            }, invalidNamespaceException);
        });

        it("should throw exception when an empty is specified", function () {
            assert.throws(function () {
                ns.namespace("");
            }, invalidNamespaceException);
        });

        it("should be able to access using object notation", function () {
            var expected = ns.namespace("test.namespace.object.notation");
            expected.test = true;

            var actual = ns.test.namespace.object.notation;

            assert.deepEqual(actual, expected);

        });

        it("should be able to store an object when specified", function () {
            var expected = {
                testObject: "I am a test"
            };
            var namespace = "ns.test.namespace.require.specifiedObject.shouldBeStored";
            ns.namespace(namespace, expected);

            var actual = ns.namespace(namespace);
            assert.deepEqual(actual, expected);
        });

        it("should be able to overwrite an object when specified", function () {
            var original = {
                testObject: "I am a test"
            };

            var expected = {
                testObject: "I am another test"
            }

            var namespace = "ns.test.namespace.require.specifiedObject.shouldBeOverWritten";
            ns.namespace(namespace, original);

            var actual = ns.namespace(namespace);
            assert.deepEqual(actual, original);

            ns.namespace(namespace, expected);
            actual = ns.namespace(namespace);

            assert.deepEqual(actual, expected);
        });

        it("should not lose child object when overwriting parent", function () {


            var parentNamespace = "ns.test.namespace.require.specifiedObject.shouldNotOverwriteChildren";
            var childNamespace = parentNamespace + ".child";

            var parent = {
                testObject: "I am a test"
            };

            var parentOverride = {
                testObject: "I am a new parent"
            }

            var child = {
                testObject: "I am another test"
            }

            // place the parent
            ns.namespace(parentNamespace, parent);
            var actual = ns.namespace(parentNamespace);
            assert.deepEqual(actual, parent);

            //
            ns.namespace(childNamespace, child);
            actual = ns.namespace(childNamespace);
            assert.deepEqual(actual, child);

            // override the parent
            actual = ns.namespace(parentNamespace, parentOverride);
            assert.deepEqual(actual, parentOverride);

            // Retrieve the child again
            actual = ns.namespace(childNamespace);
            assert.deepEqual(actual, child);
        });

    });

    describe("require", function () {
        it("should throw an exception when a required module does not exist", function () {
            var namespace = "ns.tests.namespace.require.whenModuleNotCreated.throws";

            assert.throws(function () {
                ns.require(namespace);
            });
        });

        it("should not throw an exception when required module exists", function () {
            var namespace = "ns.tests.namespace.require.whenModuleCreated.doesNotThrow";

            ns.namespace(namespace);

            assert.doesNotThrow(function () {
                ns.require(namespace);
            });
        });

        it("should return the created object", function () {
            var namespace = "ns.tests.namespace.require.whenModuleCreated.returns.expectedObject";
            var expected = ns.namespace(namespace);

            var actual = ns.require(namespace);

            assert.deepEqual(actual, expected);
        });

        it("should throw exception when no namespace is specified", function () {
            assert.throws(function () {
                ns.require();
            }, invalidNamespaceException);
        });

        it("should throw exception when an empty is specified", function () {
            assert.throws(function () {
                ns.require("");
            }, invalidNamespaceException);
        });
    });

});