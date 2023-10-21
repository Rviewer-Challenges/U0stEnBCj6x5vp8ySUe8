Hello! 
For this challenge, I started with the images. I wanted to do a memory game based on Star Wars (it motivates me more than Peppa Pig or Pokémon ^_^). I needed at least 15 different images, all needed to be the same size. Try to find some on the internet, but the variety that I needed was hard to find, so I asked https://app.leonardo.ai/ (a AI image generator) to create some for me. Then with Adobe Fireworks I standarized the images to be the same size. 
Once I got the assets I focused on the html elements. 
I needed two "screens" to present them to the user: 
- A "Level Selector", to choose the difficulty
- The "Game" itself, with as many cards as per the difficulty selected. 

What I thought was to create two divs that will act as a "holder" for each screen. I called them "level-selector-container" and "game-container".
The Level Selector needed to have a basic title and three different buttons for each difficulty. Also, each difficulty would need to have the total number of cards to play with
The Game would need to have:
- A back button, just in case the user needed to select a different difficulty at any time
- A score: that would be the number of "tries" used to complete the game. A "try" is when the user reveals two cards
- A timer: with a countdown starting at 60 seconds. Once it reaches 0 it's game over!
- A countdown of the pairs to be discovered. It starts as the maximum number of pairs for the selected difficulty and decreases each time the user completes a correct pair
The ui was easy to set up, just a container ("hud") and three divs for each purpose (score, timer and pair counter). For the cards I decided to create a list of 30 divs (the max. number of cards for the hard difficulty) and to show/hide the remaining with JavaScript based on the difficulty selected. 

Once all the dom elements are in place I styled them a little bit, because I wanted to have a functional prototype as soon as possible. what I do need to have styled was the display of the cards. For that matter I used a display:grid so all the cards would be in a grid system. Because the grid needed to vary depending on the difficulty selected I created three different clases, each one with the appropieate rows and columns (grid4by4, grid4by6 and grid6by5) but didn't assign any of these classes to the parent div yet (would do that with JS later on)

Once I had all the elements setted up I jumped right into the JS part. 
I wanted to organize everything in classes depending on its purpose, so I created four main controllers: 
- GameController.js: This class has the purpose of prepare the game based on the difficuly selection, control the "game state" (weather the user is choosing the difficulty or playing), set the score and remaining cards and starts the countdown. It would control if the timer expires and if the user completes the game, go back to the level selector. 
- CardsController.js: Will need to deal with anything card-related. From taking the reference from each card in the dom to control the cards the user is clicking and checking they match or not. 
- ViewsController: Will have a reference to the two main divs (the level selector and the game) and will show/hide them depending on the "game state"
- GridController: The only purpose for this class is to add the appropiate class to the div that contains the cards and hide the unnecessary cards
Also, I created some "helper" class that act as a glue for the other classes:
- Constants.js: It's used to store constants used in different classes, that way it's a safe way to reference them. For instance, if we choose the hard difficulty, we just need to assign a desired variable as a Constants.HARD (as oposed to a string like "hard")
- CountDown.js: It's used to have the countdown logic isolated. The max time would be dynamic as a parameter in a setCountDown method so it could be reused in another proyect
- GlobalEvents.js: It's a class that acts as a subscriber/emmiter of events using the observer pattern principles. I always wanted to have a global susbcriber/emmiter that it's also a Singleton and could be used inside any class. That way, any class can subscribe to a particular event and any class can emmit any particular event. I like this event system because it helps me have parts of the code independent from another. 
An example to illustrate the event system: 
- the class Menu has references to the three different difficulty buttons, and when any of them is clicked that class would emmit an event, like this: this.globalEvents.notify(GlobalEvents.ON_DIFFICULTY_SELECTED, difficulty) 
- the class GameController listen for that particular event, in this manner: this.globalEvents.subscribe(GlobalEvents.ON_DIFFICULTY_SELECTED, (difficultyID)=>{this.onDifficultySelected(difficultyID)}) and will call it's own method onDifficultySelected passing the value difficultyID that comes with that event
