"use strict";
exports.__esModule = true;
exports.complexVector = exports.numVector = void 0;
var complex_1 = require("../Complex Numbers/complex");
var numVector = /** @class */ (function () {
    function numVector(size) {
        this.values = new Array(size).fill(0);
    }
    numVector.prototype.length = function () {
        return this.values.length;
    };
    numVector.prototype.setValues = function (values) {
        this.values = values;
    };
    return numVector;
}());
exports.numVector = numVector;
var complexVector = /** @class */ (function () {
    function complexVector(size) {
        this.values = new Array(size).fill(new complex_1.ComplexAlgebraic(0, 0));
    }
    complexVector.prototype.length = function () {
        return this.values.length;
    };
    complexVector.prototype.setValues = function (values) {
        this.values = values;
    };
    return complexVector;
}());
exports.complexVector = complexVector;
