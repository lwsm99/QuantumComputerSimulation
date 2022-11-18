# Quantensimulator [DE]
Es geht nun darum die Funktionsweise eines Quantencomputers zu simulieren. In [Quantum Simulator Notes](./Quantum%20Simulator%20Notes.md) wurden zuerst die Grundlagen erarbeitet und darauf folgte dann das bauen des Quantensimulators. Dazu benötigen wir jedoch erst eine Bibliothek für Matrizen, jedoch wollten wir diese erst selbst bauen, erneut mit dem Konzept der Konzeptuellen Programmierung.

## Matrix & Vektor Bibliotheken
Die Bibliotheken sind in den Dateien [vector.ts](./vector.ts) und [matrix.ts](./matrix.ts) zu finden. Wie auch bei Komplexen Zahlen wurde mit einer Abstrakten Klasse und 2 Klassen gearbeitet die von dieser erben. Wir brauchen dies, damit wir sowohl reele, als auch komplexe Vektoren/Matrizen verwenden können. Da die Initialisierung und Rechenoperationen zwischen beiden sich etwas unterschieden, mussten wir diese aufteilen. Wir haben nur die nötigsten Operationen für unseren Quantensimulator implementiert.
* Initialisierung (Nullmatrix oder mit Werten)
* Identitätsmatrix anlegen
* Matrizenmultiplikation
* Kronecker Produkt
* Konvertierung zwischen Reell und Komplex

## Simulator
*TODO*



# Quantum Simulator [EN]
Now it's time to simulate the functionality of a quantum computer. In [Quantum Simulator Notes](./Quantum%20Simulator%20Notes.md) we worked out the basics first and afterwards we started building the quantum simulator. For this we first need a library for matrices, but we wanted to build it ourselves, again with conceptual programming in mind.

## Matrix & Vector Libraries
The libraries can be found in the files [vector.ts](./vector.ts) and [matrix.ts](./matrix.ts). As with complex numbers, we worked with an abstract class and 2 classes that inherit from it. We need this so that we can use both real and complex vectors/matrices. Since the initialization and arithmetic operations between the two differ, we had to split them up. We implemented only the most necessary operations for our quantum simulator.
* Initialization (zero matrix or with values).
* Create identity matrix
* Matrix multiplication
* Kronecker product
* Conversion between real and complex

## Simulator
*TODO*