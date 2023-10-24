import GlobalEvents from "../../helpers/GlobalEvents.js"
import Constants from "../../helpers/Constants.js"


class EndGameController {

    constructor() {
        this.globalEvents = GlobalEvents.getInstance()

        this.endGameView = $("#final-result")
        this.endGameView.hide()

        this.endgameLabel = $("#result-label")

        $("#exit-button").on("click", ()=>{
            this.onExitButtonClicked()
        })

        $("#replay-button").on("click", ()=>{
            this.onReplayButtonClicked()
        })
    }

    showEndGame(gameType){

        if(gameType == Constants.WIN){
            // User won
            this.endgameLabel.html(`You ${Constants.WIN} :) !!!`)
        }else{
            // User loose
            this.endgameLabel.html(`You ${Constants.LOOSE} :(`)
        }

        this.endGameView.show()
    }

    onExitButtonClicked(){
        this.globalEvents.notify(GlobalEvents.ON_EXIT_CLICKED)
        this.endGameView.hide()
    }

    onReplayButtonClicked(){
        this.globalEvents.notify(GlobalEvents.ON_REPLAY_CLICKED)
        this.endGameView.hide()
    }
    
    
}

export default EndGameController;