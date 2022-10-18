abstract class ComplexNumber {
    a: number;
    b: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b
    }

    abstract neg(): ComplexNumber;
    abstract inv(): ComplexNumber;

    abstract add(c: ComplexNumber): ComplexNumber;
    sub(c: ComplexNumber): ComplexNumber { return this.add(c.neg()); }
    abstract mul(c: ComplexNumber): ComplexNumber;
    div(c: ComplexNumber): ComplexNumber { return this.mul(c.inv()); }
    abstract abs(): number;
    abstract con(): ComplexNumber;

    abstract algebraic(): ComplexAlgebraic;
    abstract polar(): ComplexPolar;
    isAlmostEqual(c: ComplexNumber): boolean {return true; }
}

export class ComplexAlgebraic extends ComplexNumber {
    re: number;
    im: number;

    constructor(re: number, im: number) {
        super(re, im)
    }

    public neg(): ComplexAlgebraic {
        return new ComplexAlgebraic(-this.re, -this.im)
    }
    
    public inv(): ComplexAlgebraic {
        return this.polar().inv().algebraic()
    }

    public add(c: ComplexNumber): ComplexAlgebraic {
        return new ComplexAlgebraic(this.re + c.algebraic().re, this.im + c.algebraic().im)
    }
    
    public mul(c: ComplexNumber): ComplexAlgebraic {
        return this.polar().mul(c).algebraic()
    }

    public abs(): number {
        return Math.abs(Math.sqrt((this.re * this.re) + (this.im * this.im)))
    }

    public con(): ComplexAlgebraic {
        return this
    }

    public algebraic(): ComplexAlgebraic {
        return this;
    }

    public polar(): ComplexPolar {
        const rad = Math.sqrt(this.re * this.re + this.im * this.im);
        const phi = Math.atan2(this.re, this.im);
        return new ComplexPolar(rad, phi);
    }
}

export class ComplexPolar extends ComplexNumber {
    rad: number
    phi: number

    constructor(rad: number, phi: number) {
        super(rad, phi);
    }

    public neg(): ComplexPolar {
        return this.algebraic().neg().polar()
    }
    
    public inv(): ComplexPolar {
        return new ComplexPolar(1/this.rad, this.phi)
    }

    add(c: ComplexNumber): ComplexPolar {
        const new_rad = this.rad + c.polar().rad;
        const new_phi = (this.phi + c.polar().phi) % 360;
        return new ComplexPolar(new_rad, new_phi);
    }

    mul(c: ComplexNumber): ComplexPolar {
        const new_rad = this.rad * c.polar().rad;
        const new_phi = (this.phi * c.polar().phi) % 360;
        return new ComplexPolar(new_rad, new_phi);
    }

    abs(): number {
        return this.algebraic().abs();
    }

    con(): ComplexPolar {
        return new ComplexPolar(this.rad, -this.phi);
    }
    
    algebraic(): ComplexAlgebraic {
        const re: number = this.rad * Math.cos(this.phi);
        const im: number = this.rad * Math.sin(this.phi);
        return new ComplexAlgebraic(re, im);
    }

    polar(): ComplexPolar {
        return this;
    }
}

