# Marvia Assessment

## Assignment

Build a simple web application in React that simulates a working elevator. The elevator should contain the following:

- The elevator must be able to move between five floors
- The elevator must contain buttons on the outside that prepare the elevator whether you would like to go up or down
- The elevator must contain pressable buttons for all five floors
- When pressing buttons when the elevator is moving, the elevator must be able to change its route. For example, when the elevator is on the fifth floor and you press the buttons 0, 1, and 3 in this order, the elevator must recognize that the most efficient order to stop is 3 -> 1 -> 0.

## Installation

```shell
  npm install
```

## Usage

```shell
  npm start (wait until webpack build is finished before visiting http://localhost:3000)
```

## Improvements

1. Improve animation, right now when moving from floor 1 to 2 it takes 3 seconds for the elevator to reach the target floor but moving from floor 1 to 5 also takes 3 seconds. This results in an inconsistent speed. Ideally, I would want to manually control the y position of the elevator instead of using a CSS animation to fix this bug and make the elevator move at a consistent speed.
2. Make use of something like React Context instead of using the custom ElevatorState class which implements a publish/subscribe pattern. I ran into some issues with Context which is why I switched to the pubsub pattern but ideally I would want to make this work within React itself.
