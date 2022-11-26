import { ComplexAlgebraic, ComplexNumber } from "../Complex Numbers/complex"
import { Vector, RealVector, ComplexVector } from "./vector"

abstract class Matrix<Type> {
    rows: number
    columns: number
    values: Vector<Type>[]
    
    constructor(rows: number, columns: number, values?: Vector<Type>[]) {
        this.rows = rows
        this.columns = columns
        this.values = []
        this.init(values)
    }
    
    abstract toIdent(): Matrix<Type>
    abstract transpose(): Matrix<Type>
    abstract scalarMul(scalar: Type): Matrix<Type>
    abstract mul(matrix: Matrix<Type>): Matrix<Type>
    abstract kron(matrix: Matrix<Type>): Matrix<Type>

    init(values?: Vector<Type>[]): Matrix<Type> { return this.reset().compareLength(values) }
    getValue(row: number, col: number): Type { return this.values[row][col] }

    reset(): Matrix<Type> {
        this.values = this.values.map(vec => vec.init())
        return this
    }

    real(): RealMatrix | ComplexMatrix { return this as unknown as RealMatrix }
    complex(): ComplexMatrix { return this as unknown as ComplexMatrix }

    setDiagonals(value: Type): Matrix<Type> {
        if (this.rows !== this.columns) this.throwError("Matrix has to be square to set diagonals.\n")
        this.values.forEach((vec, idx) => vec.values[idx] = value)
        return this
    }

    compareLength(values: Vector<Type>[] | undefined): Matrix<Type> { 
        if (values) values.length === this.rows && values[0].length() === this.columns ? this.values = values : console.log("Matrix does not match given size, please try again\n")
        return this 
    }

    throwError(text: String): any { 
        console.log(text)
        return this
    }
}

export class RealMatrix extends Matrix<number> {
    values: RealVector[]

    toIdent(): Matrix<number> {
        return this.reset().setDiagonals(1)
    }

    transpose(): Matrix<number> {
        return new RealMatrix(this.columns, this.rows, this.values.map((vec, vecIndex) => new RealVector(this.columns, vec.values.map((_, colIndex) => this.values[colIndex][vecIndex]))))
    }

    scalarMul(scalar: number): Matrix<number> {
        return new RealMatrix(this.rows, this.columns, this.values.map(vec => vec.scalarMul(scalar)))
    }

    mul(matrix: Matrix<number>): Matrix<number> {
        if (this.columns !== matrix.rows) this.throwError("Multiplication not possible: not an equal amount of columns to rows")
        return new RealMatrix(this.rows, matrix.columns, this.values.map(vec => new RealVector(this.rows, matrix.transpose().values.map(vec2 => vec.mul(vec2)))))
    }

    kron(matrix: Matrix<number>): Matrix<number> {
        // [TODO]: make this work
        // 1) multiply matrizes with scalarMul
        // 2) concatenate matrizes (new method)
        return this
    }

    complex(): ComplexMatrix {
        return new ComplexMatrix(this.rows, this.columns, this.values.map(vec => vec.complex()))
    }
}

export class ComplexMatrix extends Matrix<ComplexNumber> {
    values: ComplexVector[]

    toIdent(): Matrix<ComplexNumber> {
        return this.reset().setDiagonals(new ComplexAlgebraic(0, 0))
    }

    transpose(): Matrix<ComplexNumber> {
        return new ComplexMatrix(this.columns, this.rows, this.values.map((vec, vecIndex) => new ComplexVector(this.columns, vec.values.map((_, colIndex) => this.values[colIndex][vecIndex]))))
    }

    scalarMul(scalar: ComplexNumber): Matrix<ComplexNumber> {
        return new ComplexMatrix(this.rows, this.columns, this.values.map(vec => vec.scalarMul(scalar)))
    }

    mul(matrix: Matrix<ComplexNumber>): Matrix<ComplexNumber> {
        if (this.columns !== matrix.rows) this.throwError("Multiplication not possible: not an equal amount of columns to rows")
        return new ComplexMatrix(this.rows, matrix.columns, this.values.map(vec => new ComplexVector(this.rows, matrix.transpose().values.map(vec2 => vec.mul(vec2)))))
    }

    kron(matrix: Matrix<ComplexNumber>): Matrix<ComplexNumber> {
        // [TODO]: make this work
        // 1) multiply matrizes with scalarMul
        // 2) concatenate matrizes (new method)
        return this
    }

    real(): RealMatrix {
        return new RealMatrix(this.rows, this.columns, this.values.map(vec => vec.real()))
    }
}