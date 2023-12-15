# Tic Tac Toe

## Overview
The assignment is to create a ReactJS web app for playing the Tic tac toe game.

## Technical conditions

- Use TypeScript
- Use "plain" ReactJS, without the use of any React frameworks
- No state management libraries allowed

## Features

### User Registration
- Register with username and password.

### User Login
- The user logs into the app with his username and password.
- After logging in, two tabs are displayed:
- Game List
- Player Ranking

### User Logout

### Game List
> A list of existing games in the app and a button for creating a new game.
- The list of existing games must be paginated.
- If the player is a participant in the game, this should be stated.
- The user should be able to filter the list by status (open, in progress, completed).
- The user can join an open game, return to a game in progress in which he is a participant, view the game of other participants in progress, or view the outcome of a co
mpleted game.

### Player Ranking
> Ranking list of the best players with their username, number of games played and win percentage.
- The list must be paginated, it is possible to fetch a maximum of 10 users at once.

### Game Display
- By clicking on creating a game or on one of the existing games from the list (in the role of an observer or an active player), a screen with the display of the game fi
eld opens.
- In the case of a new game, until the second player joins, it is not possible to play a move on the board and it is necessary to display the information that the second
player is waiting for the start of the game.
- If the user has joined an existing game as an active player, the user can play a move if it is his turn.
- If the game is in progress, the data of both players participating in the game and which player's turn to play a move are displayed.
- The app refreshes the board every few seconds to check if one of the players has played a move.
- A game in progress cannot be terminated except by its completion, a player can start multiple games or join multiple games.
- Display errors, if there is no connection or the user performs some action for which the API returns an error.

## API
- [API root](https://tictactoe.aboutdream.io)
- [Swagger with all available endpoints](https://tictactoe.aboutdream.io/swagger/)

## Submission
- For development, use a git repository on [Bitbucket](https://bitbucket.org/) or [GitHub](https://github.com/).
