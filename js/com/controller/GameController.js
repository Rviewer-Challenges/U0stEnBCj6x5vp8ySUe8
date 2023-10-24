import CountDown from "../../helpers/CountDown.js"
import GlobalEvents from "../../helpers/GlobalEvents.js"
import Constants from "../../helpers/Constants.js"
import CardsController from "./CardsController.js"
import GridController from "./GridController.js"
import ViewsController from "./ViewsController.js"
import EndGameController from "./EndGameController.js"

class GameController {

    constructor() {
        // To keep track of the movement #
        this.movements = 0

        // To keep track of the # of remaining cards
        this.remainingPairs = 10

        // Max playing time
        this.maxPlayingTime = 60

        // References to level selector and the game
        this.viewsController = new ViewsController()

        // Controller for the grid of cards depending on the level
        this.gridController = new GridController()

        // end Game screen controller
        this.endGameController = new EndGameController()

        // Initial State
        this.state = GameController.SELECTING_LEVEL

        // Back Button
        this.setupBackButton()

        // Counter DOM
        this.timeDOM = $("#time-value")
        this.timeDOM.html(this.maxPlayingTime)

        // Movement DOM
        this.movementDOM = $("#movement-value")
        this.movementDOM.html(this.movements)

        // Remaining pairs DOM
        this.remainingDOM = $("#remaining-value")
        this.remainingDOM.html(this.remainingPairs)
        

        // Count Down
        this.countDown = new CountDown()

        // Cards Controller
        this.cardsController = new CardsController()

        this.globalEvents = GlobalEvents.getInstance()
        this.globalEvents.subscribe(GlobalEvents.ON_DIFFICULTY_SELECTED, (difficultyID)=>{this.onDifficultySelected(difficultyID)})
        this.globalEvents.subscribe(GlobalEvents.ON_COUNT_DOWN, (counter)=>{this.onCountDown(counter)})
        this.globalEvents.subscribe(GlobalEvents.ON_COUNT_DOWN_COMPLETED, ()=>{this.onCountDownCompleted()})
        this.globalEvents.subscribe(GlobalEvents.ON_PAIR_MATCHED, ()=>{this.onPairMatched()})
        this.globalEvents.subscribe(GlobalEvents.ON_PAIR_UNMATCHED, ()=>{this.onPairUnMatched()})
        this.globalEvents.subscribe(GlobalEvents.ON_REPLAY_CLICKED, ()=>{this.onReplayClicked()})
        this.globalEvents.subscribe(GlobalEvents.ON_EXIT_CLICKED, ()=>{this.onExitClicked()})

        // For testing only
        
        /*
        this.maxPlayingTime = 60
        this.difficultyID = Constants.EASY
        this.gridController.setDifficulty(this.difficultyID)
        this.changeState(GameController.PLAYING)
        
        //*/
    }

    // End Game handlers
    onReplayClicked(){
        this.resetGame()
        this.onDifficultySelected(this.difficultyID)
    }

    onExitClicked(){
        this.changeState(GameController.SELECTING_LEVEL)
    }

    onDifficultySelected(difficultyID){
        // # of cards depend on the difficulty
        this.difficultyID = difficultyID
        this.gridController.setDifficulty(this.difficultyID)
        this.changeState(GameController.PLAYING)
    }

    getNumberOfCards(difficultyID){
        if(difficultyID == Constants.EASY){
            return 16
        }else if(difficultyID == Constants.MEDIUM){
            return 24
        }else if(difficultyID == Constants.HARD){
            return 30
        }
    }

    onPairMatched(){
        this.increaseMovement()   

        this.remainingPairs = this.remainingPairs - 1
        this.remainingDOM.html(this.remainingPairs)

        if( this.remainingPairs == 0){
            // Stop the countdown
            this.countDown.cancel()

            // Warn the user that it won!
            this.endGameController.showEndGame(Constants.WIN)
        }
    }

    onPairUnMatched(){
        this.increaseMovement()   
        this.updateMovementDom()
    }

    increaseMovement(){
        // Increase the # of movements
        this.movements++
    }

    updateMovementDom(){
        // Updte the dom
        this.movementDOM.html(this.movements)
    }

    onCountDown(counter){
        this.timeDOM.html(counter)
    }

    onCountDownCompleted(){
        // Warn the user that it loose!
        this.endGameController.showEndGame(Constants.LOOSE)
    }

    resetGame(){
        this.cardsController.reset()
        this.movements = 0
        this.updateMovementDom()
        this.countDown.cancel()
        this.timeDOM.html(this.maxPlayingTime)
    }

    changeState(newState)
    {
        switch(newState){
            case GameController.SELECTING_LEVEL:
                // If there is an ongoing game, reset it
                this.resetGame()
                    
                this.viewsController.showView(GameController.LEVEL_SELECTOR_CONTAINER)
                break;
            case GameController.PLAYING:
                this.viewsController.showView(GameController.GAME_CONTAINER)

                // Start countdown
                this.countDown.setCountDown(this.maxPlayingTime)
                
                // Cards setup
                const totalCards = this.getNumberOfCards(this.difficultyID)
                this.remainingPairs = totalCards / 2
                this.cardsController.setupGame(totalCards)

                // Remaining pairs
                this.remainingDOM.html(this.remainingPairs)
                break;
        }
    }

    setupBackButton(){
        $("#back-button").on("click", (el)=>{
            this.changeState(GameController.SELECTING_LEVEL)
        })
    }

    
}

GameController.SELECTING_LEVEL = "SELECTING_LEVEL"
GameController.PLAYING = "PLAYING"
GameController.LEVEL_SELECTOR_CONTAINER = "LEVEL_SELECTOR_CONTAINER"
GameController.GAME_CONTAINER = "GAME_CONTAINER"


export default GameController;