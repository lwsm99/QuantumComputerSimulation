# Schrödingers Gleichung [DE]
Die Schrödinger-Gleichung ist eine grundlegende Gleichung der Quantenmechanik. Sie beschreibt die zeitliche Veränderung eines quantenmechanischen Zustands eines nichtrelativistischen Systems.

## Grundlagen
Ein durchschnittlicher Informatiker hat leider wenig Verständnis was Physik angeht, daher müssen einige Grundlagen vorab verstanden werden, um Schrödingers Gleichung zu verstehen.

### Komplexe Zahlen
Da Wellenfunktionen durch Komplexe Zahlen dargestellt werden, müssen diese vorab verstanden werden, dafür kann man auf die [Complex Numbers README](../Complex%20Numbers/README.md) zurückgreifen.

### Differentialgleichung & Partielle Differentialgleichung
Die Differentialgleichungen beschreiben die zeitliche Entwicklung eines Physikalischen Systems. 

Die **Differentialgleichung** ist eine Gleichung bzw. ein Gleichungssystem das aus der Funktion $y(x)$ und ihren Ableitungen besteht. Die Unbekannte Funktion $y$ hängt von der Variablen $x$ ab. $x$ kann in dem Fall beispielsweise ein Ort sein.

Die **partielle Differentialgleichung** unterscheidet sich dadurch, dass Funktion $y$ von mehreren Variablen abhängt (z.B. Ort und Zeit). 

*Beispiel:*
$F(x_1, x_2, y(x_1, x_2), \frac{\partial (x_1, y_2)}{\partial x_1}, \frac{\partial (x_1, x_2)}{\partial x_2}, \frac{\partial^2 (x_1, x_2)}{\partial x_1 \partial x_2}, ...) = 0$

### Nichtrelativistisches System
Ein Nichtrelativistisches System ist ein System, welches nicht durch die Relativitätstheorie beinflusst wird. Einfach gesagt ist es unsere Wahrnehmung, da wir nur Dinge wahrnehmen können, die von unserer Wahrnehmung beeinflusst werden.

## Schrödingers Wellengleichung
Schrödingers Wellengleichung ist das Fundament fast aller praktischen Anwendungen der Quantenmechanik. Die Wellengleichung beschreibt die Veränderung eines physikalischen, nicht relativistischen Zustands.

### Grundlagen der Wellengleichung
Die Wellengleichung beschreibt einen physikalischen Zustand, dies wird über eine Funktion erreicht, welche ihre Form abhängig von der Zeit verändert, dadurch entsteht eine Art Welle, daher kommt der Name Wellengleichung. Das Ziel der Gleichung ist es die Energieniveaus der physikalischen Zustände berechnen.

### Herleitung der Formel
Wir wollen uns langsam an die vollständige Schrödingergleichung antasten.

#### Die einfachste (zeitunabhängige) Form der Schrödingergleichung
$\widehat{H}\Psi=E\Psi$

$\widehat{H}$ steht für den **Hamilton-Operator**. Der Operator ist das äquivalent zur Hamilton-Funktion der klassischen Physik. Er ist der Energie Operator der Quantenmechanik und gibt Energiemesswerte und Zeitentwicklung an. Der Operator ändert sich kontinuierlich und wird auf eine ganze Funktion ($\Psi$) angewendet, wodurch die Funktion in eine andere überführt wird.


$\widehat{H}=\frac{\hbar^2}{2m}∇^2 + V$
* $\hbar$: reduzierte Planck-Konstante (*Typisch für quantenmechanische Rechnungen*)
* $m$: Masse
* $∇$: Nabla (*Ableitung nach Raumkoordinaten, siehe Partielle Differentialgleichung*)
* $V$: Potenzielle Energie

$\Psi$ ist eine **Funktion**, welche von den drei Raumkoordinaten und der Zeitkoordinate abhängt.

$E$ steht für einen Energie-Eigenwert des Operators H bezüglich der Funktion $\Psi$.

#### Vervollständigung der Schrödingergleichung
Wenn wir $E$ so stehen lassen wie jetzt wäre die Wellenfunktion **statisch**, dadurch können jedoch keine Wellen entstehen, es fehlt die Abhängigkeit von der Zeit. Deshalb wandeln wir $E$ in einen **Operator** um:

$E=i\hbar \frac{\partial}{\partial t}$
* $i$: imaginäre Konstante ($\sqrt{-1}$)
* $\hbar$: reduzierte Planck-Konstante
* $\frac{\partial}{\partial t}$: Partielle Ableitung nach Zeit ($t$)

Je höher die Energie, desto schneller sind die Schwingungen der Wellenfunktionen.

#### Vollständige (zeitabhängige) Schrödingergleichung
$(-\frac{\hbar^2}{2m}∇^2 + V)\Psi(x, y, z, t) = i\hbar \frac{\partial \Psi(x, y, z, t)}{\partial t}$

Wir haben nun in der ersten Klammer den Hamilton Operator ($\widehat{H}$) ausgeschrieben. Beide $\Psi$ sind abhängig von Ort ($x, y, z$) & Zeit ($t$) und $E$ ist auch in seiner ausgeschriebenen Form zu sehen.





# Schrödingers Equation [EN]
The Schrödinger equation is a fundamental equation of quantum mechanics. It describes the change in time of a quantum mechanical state in a non-relativistic system.

## Basics
An average computer scientist unfortunately has little understanding when it comes to physics, so some basics must be understood first in order to comprehend Schrödinger's equation.

### Complex numbers
Since wave functions are represented by complex numbers, these must be understood in advance, for this you can refer to the [Complex Numbers README](../Complex%20Numbers/README.md).

### Differential equation & partial differential equation
Differential equations describe the development of a physical system over time. 

The **Differential Equation** is an equation or a system of equations that consists of the function $y(x)$ and its derivatives. The unknown function $y$ depends on the variable $x$. In this case $x$ can be a location for example.

The **partial differential equation** adds several variables to function $y$ (e.g., location and time). 

*Example:*
$F(x_1, x_2, y(x_1, x_2), \frac{\partial (x_1, y_2)}{\partial x_1}, \frac{\partial (x_1, x_2)}{\partial x_2}, \frac{\partial^2 (x_1, x_2)}{\partial x_1 \partial x_2}, ...) = 0$.

### Nonrelativistic System
A non-relativistic system is a system that is not affected by relativity. Simply put, it is our perception, since we can only perceive things that are influenced by our perception.

## Schrödinger's wave equation
Schrödinger's wave equation is the foundation of almost all practical applications of quantum mechanics. The wave equation describes the change in a physical, non-relativistic state.

### Fundamentals of the wave equation
The wave equation describes a physical state, this is achieved via a function that changes its shape depending on time, this creates a type of wave, hence the name wave equation. The goal of the equation is to calculate the energy levels of the physical states.

### Derivation of the formula
Let's slowly approach the full Schrödinger equation.

#### The simplest (time-independent) form of the Schrödinger equation
$\widehat{H}\Psi=E\Psi$

$\widehat{H}$ stands for the **Hamilton operator**. The operator is the equivalent of the Hamiltonian function of classical physics. It is the energy operator of quantum mechanics and gives energy measurements & time evolution. The operator changes continuously and is applied to an entire function ($\Psi$), transforming the function into another one.


$\widehat{H}=\frac{\hbar^2}{2m}∇^2 + V$
* $\hbar$: Reduced Planck constant (*typical for quantum mechanical calculations*).
* $m$: Mass
* $∇$: Nabla (*derivation by space coordinates, see Partial Differential Equation*).
* $V$: Potential energy

$\Psi$ is a **function** which depends on the three space coordinates and the time coordinate.

$E$ stands for an energy eigenvalue of the operator H with respect to the function $\Psi$.

#### Completion of the Schrödinger equation.
If we leave $E$ as it is now, the wave function would be **static**, but this cannot produce waves, it lacks dependence on time. Therefore we convert $E$ into an **operator**:

$E=i\hbar \frac{\partial}{\partial t}$
* $i$: imaginary constant ($\sqrt{-1}$)
* $\hbar$: reduced Planck constant
* $\frac{\partial}{\partial t}$: Partial derivative with respect to time ($t$).

The higher the energy, the faster the oscillations of the wave functions.

#### Complete (time-dependent) Schrödinger equation
$(-\frac{\hbar^2}{2m}∇^2 + V)\Psi(x, y, z, t) = i\hbar \frac{\partial \Psi(x, y, z, t)}{\partial t}$

We have now written out the Hamilton operator ($\widehat{H}$) in the first bracket. Both $\Psi$ are dependent on location ($x, y, z$) & time ($t$) and $E$ can also be seen in its written out form.

# Sources
* https://de.wikipedia.org/wiki/Schr%C3%B6dingergleichung
* https://studyflix.de/ingenieurwissenschaften/schrodinger-gleichung-2457
* https://www.uni-muenster.de/AMM/num/Vorlesungen/natterer/PDGL_WS05/skript.pdf
* https://www.nobelprize.org/uploads/2017/07/schrodinger-lecture.pdf
* http://www.quantenwelt.de/quantenmechanik/wellenfunktion/schrodingergleichung.html
* https://en.wikipedia.org/wiki/Special_relativity
* https://en.wikipedia.org/wiki/Relativism
* https://en.wikipedia.org/wiki/Partial_differential_equation