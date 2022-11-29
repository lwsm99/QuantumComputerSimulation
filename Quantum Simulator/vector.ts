import { ComplexAlgebraic, ComplexNumber } from "../Complex Numbers/complex"

export abstract class Vector<Type> {
    values: Type[]

    constructor(size: number, values?: Type[]) {
        this.values = new Array<Type>(size)
        this.init(values)
    }

    abstract init(values?: Type[]): Vector<Type>
    abstract mul(vector: Vector<Type>): Type
    abstract scalarMul(scalar: Type): Vector<Type>

    length(): number { return this.values.length }

    real(): RealVector { return this as unknown as RealVector }
    complex(): ComplexVector { return this as unknown as ComplexVector }

    compareLength(values: Type[] | undefined): Vector<Type> {
        if (values) values.length === this.length() ? this.values = values : console.log("Vector does not match given size, please try again\n")
        return this 
    }

    throwError(text: String): any { 
        console.log(text)
        return this
    }
}

export class RealVector extends Vector<number> {
    values: number[]

    init(values?: number[]): Vector<number> {
        this.values.forEach(val => val = 0)
        return this.compareLength(values)
    }

    scalarMul(scalar: number): Vector<number> {
        this.values.forEach(value => value * scalar)
        return this
    }

    mul(vector: Vector<number>): number {
        return this.values.reduce((sum, el, idx) => sum += el * vector.values[idx], 0)
    }

    complex(): ComplexVector {
        return new ComplexVector(this.length(), this.values.map(el => new ComplexAlgebraic(el, 0)))
    }
}

export class ComplexVector extends Vector<ComplexNumber> {
    values: ComplexNumber[]

    init(values?: ComplexNumber[]): Vector<ComplexNumber> {
        this.values.forEach(val => val = new ComplexAlgebraic(0, 0))
        return this.compareLength(values)
    }

    scalarMul(scalar: ComplexNumber): Vector<ComplexNumber> {
        this.values.forEach(value => value.mul(scalar))
        return this
    }

    mul(vector: Vector<ComplexNumber>): ComplexNumber {
        return this.values.reduce((sum, el, idx) => sum = sum.add(el.mul(vector.values[idx])), new ComplexAlgebraic(0, 0))
    }

    real(): RealVector {
        return this.values.every(el => el.b === 0) ? new RealVector(this.length(), this.values.map(el => el.a)) : this.throwError("All imaginary elements have to be 0 to transform to Real.\n")
    }
}