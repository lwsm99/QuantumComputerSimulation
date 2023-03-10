# Quantenschach [DE]
Die Quantenphysik weist eine erhebliche Komplexität auf und stellt das, was wir über die Wirklichkeit zu wissen glauben, in Frage. Ihr kontraintuitives Verhalten stellt selbst Experten vor Herausforderungen. Quantenspiele bieten eine Möglichkeit, das ungewöhnliche Verhalten der Quantenwelt zu erfahren, ohne sich in komplexe Mathematik einzubringen.

Das Ziel dieses Projekts besteht darin, die Quantenwelt mit Schach zu verbinden. Es gab bereits mehrere Bemühungen, Quantenspiele zu entwickeln, darunter auch Quantenschach. Dieses Projekt basiert auf [diesem Papier von Christopher Cantwell](https://arxiv.org/pdf/1906.05836.pdf) und es wird empfohlen, dieses Papier zu lesen, um ein tieferes Verständnis des Themas zu erlangen.

Eine ausführlichere Beschreibung des Projekts kann man in [Quantum_Chess.de.pdf](Quantum_Chess.de.pdf) vorfinden.


## Quantenschach-Regelwerk
Es gelten die Grundregeln von Schach, mit Ausnahme der unten aufgeführten Regeln.

#### Bewegung
* Klassischer Schach Move
* Split Move: Eine Figur kann zwei verschiedene Ziele auf einmal wählen (beides müssen legale Züge sein).
    * Split Moves dürfen nicht verwendet werden, um gegnerische Figuren zu schlagen.
* Merge Move: Zwei geteilte Figuren können zu einer einzigen Figur verschmolzen werden (das Zielfeld muss für beide Figuren ein erlaubter Zug sein)

#### Gespaltene Figuren 
* Gespaltene Figuren können gegnerische Figuren schlagen.
* Gespaltene Figuren können selbst geschlagen werden.
* Es ist nicht erlaubt, gespaltene Figuren weiter zu spalten.

#### Messung
* Der Zustand einer Figur ist erst bekannt, wenn sie gemessen wird.
* Die Messung erfolgt in den folgenden Fällen:
  * Eine geteilte Figur versucht, eine andere Figur zu schlagen.
  * Ein geteilter König wird von einer anderen Figur geschlagen.
* Eine Messung ist eine 50/50 Chance

#### Andere Regeln
* Es gibt kein Schach oder Schachmatt, das Spiel endet, wenn der König geschlagen wird.
* Es gibt keine Regeln für Ën Passant", "Rochade" oder "Ümwandlung", für die Einfachheit.


## Projektstruktur
Das Projekt ist wie folgt strukturiert:
* `Chess` -> Diese Klasse ist der Einstiegspunkt, sie führt eine Fehlerprüfung durch, bevor sie Methoden von anderen Klassen ausführt
* `Board` -> Jedes Schachspiel hat ein Brett, ein Brett hat 64 Tiles, die entweder Figuren haben oder leer sind
* `Piece` -> Eine Figur enthält alle wichtigen Informationen über eine Figur, kann move/splitMove/mergeMove, ihre reale Position messen und alle möglichen Züge erhalten
  * `King`, `Queen`, `Rook`, `Knight`, `Bishop`, `Pawn`
  * Jede Figur hat verschiedene mögliche Züge, also gibt es eine Klasse für jede einzelne Figur, die sich nur in der possibleMoves Methode unterscheidet

## Projektaufbau & Kompilierung
* Kompiliere die Schachlogik-Datei: `tsc Chess.ts`
* In das Frontend-Verzeichnis wechseln: `cd frontend`
* Erforderliche Abhängigkeiten installieren: `npm install`
* Das Projekt lokal ausführen: `npm run serve`
* Das Projekt ist nun unter http://localhost:8080/ verfügbar.




# Quantum Chess [EN]
The quantum world is overly complicated and contradicts everything we know about reality. It's counterintuitive to the point, that even scientists struggle with it. Quantum Games are one way in which people can experience the strange behaviour of the quantum realm without diving into the complicated mathematics.

Combining the quantum world with chess is the goal of this project, there have been multiple attempts at making quantum games before, even quantum chess. This project is based on [this paper by Christopher Cantwell](https://arxiv.org/pdf/1906.05836.pdf), I would highly recommend giving it a read if you want a deeper dive into this topic.


## Quantum Chess Ruleset
Basic Chess rules apply, except for the rules listed below.

#### Movement
* A player may perform a basic chess move, split move or merge move
* Split Move: A piece can choose two different targets at once (both must be legal moves)
    * Split moves may not be used to capture enemy pieces
* Merge Move: Two split pieces can be merged into one piece (the target tile must be a legal move for both pieces)

#### Split pieces 
* Split pieces can capture other pieces
* Split pieces can be captured
* Split pieces cannot be split further apart

#### Measurement
* The state of a piece is not known until it's measured
* Measurement occurs in the following two instances:
  * A split piece is trying to capture another piece
  * A split king is captured by another piece
* A measurement is a 50/50 chance 

#### Other Rules
* There is no check or checkmate, the game ends when the king is captured


## Project Structure
The Project is structured like the following:
* `Chess` -> This class is the entry point, does error checking before executing methods from other classes
* `Board` -> Each chess game has one Board, a board has 64 Tiles with either pieces or being empty
* `Piece` -> A piece holds all important information about a piece, can move/splitMove/mergeMove, measure it's real position and get all possible moves
  * `King`, `Queen`, `Rook`, `Knight`, `Bishop`, `Pawn`
  * Each Piece Type has different possible moves, so there's a class for each single Piece only differing in the possibleMoves Method

## Project setup & compilation
* Compile chess logic file: `tsc Chess.ts`
* Switch into frontend directory: `cd frontend`
* Install required dependencies: `npm install`
* Run the project locally: `npm run serve`
* The project is now available at http://localhost:8080/