# Duel Ace - Online Multiplayer Card Game
## About
[Duel Ace](https://duel-ace-game-65466bc601e9.herokuapp.com/) is a [Blackjack](https://en.wikipedia.org/wiki/Blackjack) inspired online multiplayer card game. Players alternate turns with the option of playing a special card, ending their turn or standing. The first player to 21 points or the player with the most points under 21 wins.
## Features
- Real-time play -  Low latency client/server communication implemented with [Socket.IO](https://socket.io/)
- Random matchmaking - Players can enter a queue to play against another online player
- Singleplayer - A player can play on their own against a computer
- Private games - A player can host or join a private game, allowing friends to play against each other
## Frontend Tech Stack (`/client`)
- Typescript
- React
- TailwindCSS
- Socket.IO
- Vitest (tests)
- React Testing Library (tests)
## Backend Tech Stack (`/server`)
- Typescript
- Express.js
- Socket.IO
- Vitest (tests)
## Deployment
The backend serves the frontend as static files and is deployed here: https://duel-ace-game-65466bc601e9.herokuapp.com/
## Run this project locally
Start the server
```
$ cd server
$ yarn install
$ yarn dev
```
Start the client
```
$ cd ..
$ cd client
$ yarn install
$ yarn dev
```
