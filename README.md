# Simon Game Clone

## Rules and Gameplay 
The device has four colored buttons, each producing a particular tone when it is pressed or activated by the device. A round in the game consists of the device lighting up one or more buttons in a random order, after which the player must reproduce that order by pressing the buttons. As the game progresses, the number of buttons to be pressed increases. (This is only one of the games on the device; there are actually other games on the original.) **Taken from Wikipedia**.

![Simon Game Toy](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Simon_Electronic_Game.jpg/1024px-Simon_Electronic_Game.jpg)

This uses JavaScript event listeners to listen for button clicks.  A pattern is randomly generated based on a random number (0-3) representing the four colours.  Once chosen, the user
tries to guess the pattern.  The user array of chosen colours is cleared after each "level" so
that at each new level, they have to guess the pattern from the beginning, as the pattern
of the randomly chosen colours is simply appended after each level.
