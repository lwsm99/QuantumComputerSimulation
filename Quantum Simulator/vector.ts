import { ComplexAlgebraic, ComplexNumber } from "../Complex Numbers/complex"

abstract class Vector<Type> {
    values: Type[]

    constructor(size: number) {
        this.values = new Array<Type>(size)
    }

    abstract init(values?: Type[]): Vector<Type>
    length(): number { return this.values.length }
    compareLength(values: Type[] | undefined): Vector<Type> { 
        if (values) values.length === this.length() ? this.values = values : console.log("Vector does not match given size, please try again\n")
        return this 
    }
}

export class numVector extends Vector<number> {
    values: number[]

    init(values?: number[]): Vector<number> {
        this.values = this.values.fill(0)
        return this.compareLength(values)
    }
}

export class complexVector extends Vector<ComplexNumber> {
    values: ComplexNumber[]

    init(values?: ComplexNumber[]): Vector<ComplexNumber> {
        this.values = this.values.fill(new ComplexAlgebraic(0, 0))
        return this.compareLength(values)
    }
}