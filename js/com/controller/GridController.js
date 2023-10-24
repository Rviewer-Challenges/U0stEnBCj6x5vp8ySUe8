import GlobalEvents from "../../helpers/GlobalEvents.js"
import Constants from "../../helpers/Constants.js"

class GridController {

    constructor() {
        this.cardHolderDom = $("#card-holder")
        this.currentClass = ""      
        this.totalCards = 0  
    }

    setDifficulty(difficultyID){

        this.removePreviousClass()

        switch(difficultyID){
            case Constants.EASY:
                this.currentClass = Constants.GRID_4_4_CLASS
                this.cardHolderDom.addClass(Constants.GRID_4_4_CLASS)    
                this.totalCards = 16              
                break;
            case Constants.MEDIUM:
                this.currentClass = Constants.GRID_4_6_CLASS
                this.cardHolderDom.addClass(Constants.GRID_4_6_CLASS)
                this.totalCards = 24
                break;
            case Constants.HARD:
                this.currentClass = Constants.GRID_6_5_CLASS
                this.cardHolderDom.addClass(Constants.GRID_6_5_CLASS)
                this.totalCards = 30
                break;
        }

        $(".card").each((i, card) =>{
            const cardNumber = i + 1

            if(cardNumber <= this.totalCards){
                // this card must be shown
                $(card).show()
            }else{
                // Hide this extra card
                $(card).hide()
            }
        })
    }

    removePreviousClass(){
        if(this.currentClass != ""){
            this.cardHolderDom.removeClass(this.currentClass) 
        }
    }

    
    
}

export default GridController;