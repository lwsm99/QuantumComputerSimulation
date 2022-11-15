"use strict";
exports.__esModule = true;
exports.Matrix = void 0;
var complex_1 = require("../Complex Numbers/complex");
var Matrix = /** @class */ (function () {
    //constructor(rows: number, columns: number, type?: String) {
    function Matrix(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrixValues = [];
        //this.isComplex = type?.toLowerCase() === "complex"
        this.reset();
    }
    //initValues(values: number[][] | ComplexNumber[][]): Matrix {
    Matrix.prototype.initValues = function (values) {
        if (values[0].length > this.rows || values.length > this.columns) {
            console.log("Matrix has not enough columns or rows, please try again\n");
            return this;
        }
        else if ((values[0].length < this.rows && this.rows != 0) || (values.length < this.columns && this.columns != 0)) {
            console.log("Matrix has more rows or columns than values specified, please try again\n");
            return this;
        }
        for (var row = 0; row < this.rows; row++) {
            this.matrixValues[row] = [];
            for (var col = 0; col < this.columns; col++) {
                this.matrixValues[row][col] = values[row][col];
            }
        }
        return this;
    };
    Matrix.prototype.initIdentity = function () {
        if (this.rows !== this.columns) {
            console.log("Matrix is not a square matrix, not possible\n");
            return this;
        }
        this.reset();
        for (var ident = 0; ident < this.rows; ident++) {
            //if (this.isComplex) this.matrixValues[ident][ident] = new ComplexAlgebraic(1, 0)
            //else this.matrixValues[ident][ident] = 1
            this.matrixValues[ident][ident] = 1;
        }
        return this;
    };
    Matrix.prototype.reset = function () {
        for (var row = 0; row < this.rows; row++) {
            this.matrixValues[row] = [];
            for (var col = 0; col < this.columns; col++) {
                //if (this.isComplex) this.matrixValues[row][col] = new ComplexAlgebraic(0, 0)
                //else this.matrixValues[row][col] = 0
                this.matrixValues[row][col] = 0;
            }
        }
        return this;
    };
    //getValue(row: number, col: number): number | ComplexNumber {
    Matrix.prototype.getValue = function (row, col) {
        return this.matrixValues[row - 1][col - 1]; // -1 for people who dont know that array starts at 0 haha
    };
    Matrix.prototype.multiply = function (matrix) {
        if (this.columns !== matrix.rows) {
            console.log("Multiplication not possible: not an equal amount of columns to rows");
            return this;
        }
        //if (this.isComplex !== matrix.isComplex) {
        //    console.log("Multiplication not possible: one matrix is complex, the other is not")
        //    return this
        //}
        //const isComplexHelper: string = this.isComplex ? "complex" : ""
        //var newMatrix: Matrix = new Matrix(this.rows, matrix.columns, isComplexHelper)
        var newMatrix = new Matrix(this.rows, matrix.columns);
        /**
         * 0,0 0,1 0,2          0,0 0,1           0,0 0,1
         * 1,0 1,1 1,2    *     1,0 1,1      =    1,0 1,1
         *                      2,0 2,1
         *
         * 2 * 3          3 * 2         2 * 2
         */
        for (var newRow = 0; newRow < newMatrix.rows; newRow++) {
            for (var newCol = 0; newCol < newMatrix.columns; newCol++) { // current new row and col
                var sum = 0;
                for (var i = 0; i < this.rows; i++) {
                    sum += this.matrixValues[newRow][i] * matrix.matrixValues[i][newCol];
                }
                newMatrix.matrixValues[newRow][newCol] = sum;
            }
        }
        return newMatrix;
    };
    return Matrix;
}());
exports.Matrix = Matrix;
var realMatrix = new Matrix(3, 3).initValues([[1, 1, 1], [1, 1, 0], [1, 0, 0]]);
var realMatrix2 = new Matrix(3, 3).initValues([[1, 1, 1], [1, 1, 0], [1, 0, 0]]);
console.log(realMatrix);
console.log(realMatrix2);
console.log(realMatrix.multiply(realMatrix2));
var c1 = new complex_1.ComplexAlgebraic(2, 1);
var c2 = new complex_1.ComplexAlgebraic(1, 0);
var c3 = new complex_1.ComplexAlgebraic(1, 2);
//const complexMatrix: Matrix = new Matrix(3, 3, "complex").initValues([[c1, c2, c3], [c2, c2, c2], [c3, c2, c1]])
//console.log(complexMatrix);
// https://github.com/Kapcash/ts-matrix/blob/master/src/Vector.ts
