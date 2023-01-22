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
[TODO]

## Project setup & compilation
* Compile chess logic file: `tsc Chess.ts`
* Switch into frontend directory: `cd frontend`
* Install required dependencies: `npm install`
* Run the project locally: `npm run serve`
* The project is now available at http://localhost:8080/