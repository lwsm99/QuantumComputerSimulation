const EPSILON = 2.220446049250313e-16

export abstract class ComplexNumber {
    a: number
    b: number

    constructor(a: number, b: number) {
        this.a = a
        this.b = b
    }

    neg(): ComplexNumber { return this.algebraic().neg() }
    inv(): ComplexNumber { return this.polar().inv() }

    add(c: ComplexNumber): ComplexNumber { return this.algebraic().add(c.algebraic()) }
    sub(c: ComplexNumber): ComplexNumber { return this.add(c.neg()) }
    mul(c: ComplexNumber): ComplexNumber { return this.polar().mul(c.polar()).algebraic() }
    div(c: ComplexNumber): ComplexNumber { return this.mul(c.inv()) }
    abs(): number { return this.algebraic().abs() }
    abstract con(): ComplexNumber

    algebraic(): ComplexAlgebraic { return this as unknown as ComplexAlgebraic }
    polar(): ComplexPolar { return this as unknown as ComplexPolar }
    isAlmostEqual(c: ComplexNumber, e?: number): boolean { return this.abs() - c.abs() <= (e ? e * Math.pow(1, e) : EPSILON) }
}

export class ComplexAlgebraic extends ComplexNumber {

    constructor(re: number, im: number) {
        super(re, im)
    }

    public neg(): ComplexAlgebraic {
        return new ComplexAlgebraic(-this.a, -this.b)
    }

    public add(c: ComplexAlgebraic): ComplexAlgebraic {
        return new ComplexAlgebraic(this.a + c.a, this.b + c.b)
    }

    public abs(): number {
        return Math.abs(Math.sqrt((this.a * this.a) + (this.b * this.b)))
    }

    public con(): ComplexAlgebraic {
        return new ComplexAlgebraic(this.a, -this.b)
    }

    public polar(): ComplexPolar {
        const re = this.a, im = this.b
        const r = Math.sqrt(re * re + im * im)
        const phi = Math.atan2(im, re)
        return new ComplexPolar(r, phi)
    }

    public re(): number {
        return this.a
    }

    public im(): number {
        return this.b
    }
}

export class ComplexPolar extends ComplexNumber {

    constructor(rad: number, phi: number) {
        super(rad, phi)
    }

    public inv(): ComplexPolar {
        return new ComplexPolar(1/this.a, this.b)
    }

    public mul(c: ComplexPolar): ComplexPolar {
        return new ComplexPolar(this.a * c.a, this.b + c.b)
    }

    public con(): ComplexPolar {
        return new ComplexPolar(this.a, -this.b)
    }
    
    public algebraic(): ComplexAlgebraic {
        const r = this.a, phi = this.b
        const re: number = r * Math.cos(phi)
        const im: number = r * Math.sin(phi)
        return new ComplexAlgebraic(re, im)
    }

    public rad(): number {
        return this.a
    }

    public phi(): number {
        return this.b
    }
}
