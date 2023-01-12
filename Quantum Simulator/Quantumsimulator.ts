import { ComplexMatrix } from "./matrix"

const EPSILON = 2.220446049250313e-16

export class QState {
    state: ComplexMatrix
    qubits: number

    constructor(qubits: number) {
        this.state = new ComplexMatrix(2**qubits, 1)
        this.state[0] = 1
    }

    op(operator: ComplexMatrix, i: number = 0) {
        const eyeL = new ComplexMatrix(2**i, 2**i).toIdent()
        const eyeR = new ComplexMatrix(2**(this.qubits - i - Math.floor(Math.log(operator.rows))), 2**(this.qubits - i - Math.floor(Math.log(operator.rows)))).toIdent()
        this.state = eyeL.kron(operator).kron(eyeR).mul(this.state)
        return this
    }

    isValid() {
        let sum = 0
        for (let i = 0; i < this.state.rows; i++) {
            sum += this.state[i].abs2()
        }
        return Math.abs(sum - 1) < EPSILON
    }
}