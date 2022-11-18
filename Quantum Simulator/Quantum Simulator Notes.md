# Quantum Simulator
Dieser Text ist sehr stark inspiriert von Professor Herzbergs Text [Ein Simulator für Quantenschaltungen](https://github.com/denkspuren/qcsim/blob/main/qcsim.ipynb).

## Basics

### Physikalische Realität simulieren
In unserer Realität können wir nicht wissen was mit Quanten passiert, wenn wir sie nicht beobachten. Wir kennen nur ihren Endzustand, wenn wir sie beobachten. Wir können nicht gleichzeitig die Position und die Geschwindigkeit eines Partikels wissen, es ist nur eins von beiden zur selben Zeit möglich.

Um dies zu simulieren, haben wir unsere Quantenbits (Qubits), welche gewisse Wahrscheinlichkeiten besitzen einen Zustand anzunehmen. Wenn wir jedoch diese Qubits beobachten, kollabiert der Zustandsraum und wir haben nur noch die binären Werte als Ergebnis.

### Bestandteile des Quantensimulators
* Quantenbits
* Zustandsraum (Aufgespannt von Quantenbits)
* Quantenoperatoren

Die Quantenbits sind getrennt vom Zustandsraum zu sehen. Quantenoperatoren können auf den Zustandsraum angewendet werden, unter anderem die Beobachtung, welche sich auf beides auswirkt.

### Verschränkung
Qubits müssen nicht physikalisch miteinander verbunden (verdrahtet) sein, sie müssen verschränkt sein und sind immer noch miteinander verbunden sein, selbst wenn sie weiter voneinander entfernt sind. 

### Theorie =/= Praxis
Quanten sind äußerst empfindlich und deshalb immer Störungen ausgesetzt, das muss man bei der Simulation natürlich berücksichtigen, weil man möglichst nah an die Reale Welt rankommen möchte.



## Simulator für klassische Logikgatter

### Register aus n Bits hat 2^n Zustände
* n = 1 -> [0 | 1]
* n = 2 -> [0 0 | 0 1 | 1 0 | 1 1]
* n = 3 -> [0 0 0 | 0 0 1 | 0 1 0 | 0 1 1 | 1 0 0 | 1 0 1 | 1 1 1]
* ...

Man kann das ganze als Zustandsvektor zeigen. Man legt also einen Vektor der größe 2^n an und der Index des 1-Wertes bestimmt, welcher Binäre Wert repräsentiert wird. Beispielsweise bei n = 2, (0 0 1 0) steht für den binären Wert 10.

In Python kann man diesen Array mit Numpy anlegen. Alle Werte werden dann auf 0 initalisiert. Setzt man die erste Zahl auf 1, so steht der Array für den Binärwert 0.

### NOT-Gatter für 1-Bit Register

Bei NOT ist entweder a = 1 und b = 0 oder a = 0 und b = 1. Die NOT-Operation wechselt diese Bits. Zustand (a b) wird dann zu (b a). NOT lässt sich hier als Matrix darstellen, welche (a b) in (b a) überführt. Dies lässt sich einfach in Python umsetzen mit dem Array `np.array([[0, 1], [1, 0]])`

### NOT-Gatter für 2-Bit Register

Wir müssen nun die 2x2 Matrix in eine 4x4 umwandeln, da es nun 4 Zustände gibt. das geht mit der Einheitsmatrix und dem Kronecker-Produkt.
* Einheitsmatrix initialisieren
* Das erste Bit auf NOT setzen
  - Kronecker Produkt von 2x2 NOT-Matrix und 2x2 Einheitsmatrix bilden ($NOT \otimes I_2$)
* Zweites bit auf NOT setzen
  - Kronecker Produkt von 2x2 Einheitsmatrix und 2x2 NOT-Matrix bilden ($I_2 \otimes NOT$)
* Beide Bits auf NOT setzen
  - Kronecker Produkt zweier 2x2 NOT-Matrizen bilden ($NOT \otimes NOT$)

### NOT-Gatter für 3-Bit Register

Für das dritte Bit auf NOT muss man Kronecker Produkt von 2x2 NOT-Matrix und 4x4 Einheitsmatrix bilden ($NOT \otimes I_4$)
Für das zweite Bit muss man das Kronecker Produkt einer 2x2 Einheitsmatrix und einer 2x2 NOT-Matrix bilden und daraus nochmal das Produkt mit einer 2x2 Einheitsmatrix ($I_2 \otimes NOT \otimes I_2$)

### Simulator Code für Logikgatter

```class CState:
    def __init__(self, n):
        self.n = n
        self.state = np.zeros(2**n, dtype=np.int32)
        self.state[0] = 1 # Initialisierung auf Wert 0
    def op(self, operator, i = 0):
        eyeL = np.eye(2**i, dtype=np.int32)
        eyeR = np.eye(2**(self.n - i - int(math.log(operator.shape[0], 2))), dtype=np.int32)
        self.state = np.kron(np.kron(eyeL, operator), eyeR) @ self.state
        return self
    def __repr__(self):
        return "%s(%s): %s" % (self.__class__.__name__, self.n, self.state)
```

* `__init__` initialisiert die Matrix
* `op` nimmt als operator eine Operationsmatrix und den Anfangsindex ab dem die Operation angewendet werden soll, eyeL & eyeR sind die linke und rechte Einheitsmatrix und dazwischen liegt die Operator-Matrix. Die Größen der Identitätsmatrizen werden mit einer Logarithmus-Funktion zur Basis 2 bestimmt.
* `__repr__` dient als Repräsentation der CState Objekte

### AND Gatter

Unser Ergebnis muss immer noch als zwei-Bit-Register rauskommen im Vergleich zum klassischen AND. Daher benutzen wir nur einen der Bits um das AND zu kodieren. Unser Ergebnis wird im zweiten Bit kodiert, was durch folgende Matrix erreicht wird.

``` 
[1, 0, 1, 0]   [a]   [a c]
[0, 1, 0, 0] * [b] = [ b ]
[0, 0, 0, 0]   [c]   [ 0 ]
[0, 0, 0, 1]   [d]   [ d ]
```

Damit haben wir folgende Ergebnisse: 
* [00] -> [00]
* [01] -> [00]
* [10] -> [10]
* [11] -> [11]

Das zweite Bit ist nur 1, wenn beide Bits 1 sind, da d = d.

### OR Gatter

Das OR Gatter funktioniert nach dem selben Prinzip.

``` 
[1, 0, 0, 0]   [a]   [ a ]
[0, 1, 1, 0] * [b] = [b, c]
[0, 0, 0, 0]   [c]   [ 0 ]
[0, 0, 0, 1]   [d]   [ d ]
```

Damit haben wir folgende Ergebnisse: 
* [00] -> [00]
* [01] -> [01]
* [10] -> [01]
* [11] -> [11]

Das zweite Bit ist nun nur 0, wenn beide Bits 0 sind, da a = a.


## Simulator für Quantenschaltungen

### Simulator-Code

Es kann nun fast der selbe Code verwendet werden, wir brauchen nur die Quantengatter, also Matrizen aus komplexen Zahlen.

Quantengatter können nun nicht mehr nur eine 1 pro Zustandsvektor beinhalten, sondern sind in Matrizenform möglich, welche die Werte im Zustandsraum verteilen. Die Summe der Werte muss jedoch 1 ergeben.

```
class QState:
    def __init__(self, n):
        self.n = n
        self.state = np.zeros(2**n, dtype=complex)
        self.state[0] = 1 # Initialisierung auf Wert 0
    
    def op(self, operator, i = 0):
        eyeL = np.eye(2**i, dtype=complex)
        eyeR = np.eye(2**(self.n - i - int(math.log(operator.shape[0], 2))), dtype=complex)
        self.state = np.kron(np.kron(eyeL, operator), eyeR) @ self.state
        return self
    
    def isvalid(self):
        return isclose(self.state @ np.conjugate(self.state), 1.0)
    
    def __repr__(self):
        repr = f"{self.__class__.__name__}({self.n}) valid = {self.isvalid()}:"
        for i in range(0, self.state.shape[0]):
            num = self.state[i]
            repr += f"\n{i:2d} |{i:0{self.n}b}⟩ "
            repr += f"{num.real if isclose(num.imag, 0.0) else (f'{num.imag}i' if isclose(num.real, 0.0) else f'{num.real} + {num.imag}i')} "
            repr += f"({abs(num):.4f} * e^{phase(num) / pi * 180.0:.2f}°) "
            repr += f"{abs(num * num):.2%}"
        return repr
    
    def show(self):
        print(self)
        return self
    
    def plot(self):
        names = list(map(lambda x: f'|{x}⟩', range(0, self.state.shape[0])))
        values = list(map(lambda x: abs(x), self.state * self.state))
        plt.bar(names, values)
        plt.suptitle(f'{self.__class__.__name__}({self.n})')
        plt.show()
        return self
```

* `__init__` und `op` bleiben gleich
* `__repr__` wird angepasst, da das repräsentieren nun komplizierter ist
* `show` erlaubt einen print eines QStates
* `plot` erstellt ein Balkendiagramm zur Wahrscheinlichkeitsverteilung der Zustände im Zustandsvektor

### Spezial-Operator SWAP
Ein Operator arbeitet manchmal mit 2 Qubits, welche aber nicht unbedingt hintereinander aufgereiht sind. SWAP kann zwei aufeinanderfolgende Qubits tauschen und sich die Qubits arrangieren wie gewollt. Das ist nötig um die op Methode so kurz zu halten.

**SWAP**
```
[1,0,0,0]
[0,0,1,0]
[0,1,0,0]
[0,0,0,1]
```

### Quantengatter
Die [Quantengatter](https://de.wikipedia.org/wiki/Liste_der_Quantengatter) werden nun implementiert.

```
inv_sqrt2 = 1 / 2**0.5                              1 durch Wurzel aus 2
```

**CNOT**
```
[1,0,0,0]
[0,1,0,0]
[0,0,0,1]
[0,0,1,0]
```

**S**
```
[1,0 ]
[0,1j]
```

**T**
```
[1,              0            ]
[0, inv_sqrt2 + inv_sqrt2 * 1j]
```

**H**
```
inv_sqrt2 * 
[1, 1]
[1,-1]
```

**PAULIX**
```
[0,1]
[1,0]
```

**PAULIY**
```
[  0 ,0-1j]
[0+1j,  0 ]
```

**PAULIZ**
```
[1, 0]
[0,-1]
```

**XROT**
```
inv_sqrt2 *
[  1 ,0-1j]
[0-1j,  1 ]
```

**YROT**
```
inv_sqrt2 *
[1,-1]
[1, 1]
```

**TOFFOLI**
```
[1,0,0,0,0,0,0,0]
[0,1,0,0,0,0,0,0]
[0,0,1,0,0,0,0,0]
[0,0,0,1,0,0,0,0]
[0,0,0,0,1,0,0,0]
[0,0,0,0,0,1,0,0]
[0,0,0,0,0,0,0,1]
[0,0,0,0,0,0,1,0]
```
