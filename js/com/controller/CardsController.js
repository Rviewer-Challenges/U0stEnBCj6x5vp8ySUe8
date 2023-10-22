import GlobalEvents from "../../helpers/GlobalEvents.js"
import Constants from "../../helpers/Constants.js"
import Card from "../model/Card.js"

class CardsController {

    constructor() {
        // References to level selector and the game     
        this.showZIndex = 100   
        this.hideZIndex = 1   
        // More wait time here to let the user know the error   
        this.animationDuration = 1000 
        this.waitMissmatchCards = 1100 
        this.waitMatchedCards = 10   

        this.globalEvents = GlobalEvents.getInstance()

        this.setupCards()

    }

    setupCards(){
        // Object to store card data
        this.cards = {}
        
        // Cards data structure:
        // - Data state
        // - Click handler
        // - Change image based on the shuffled array
        $(".card-button").each((i, cardButton) =>{
            
            const cardID = i
           
            const backImage = $(cardButton).find(".back-image")
            const cardImage = $(cardButton).find(".card-image")

            const cardData = new Card(
                {
                    id: cardID,
                    type: "not-set",
                    backImage:backImage,
                    cardImage:cardImage,
                    state: Constants.HIDDEN,
                    isLocked:false,
                    dom: $(`#card-${(cardID+1)}`)
                }
            )
            
            this.cards[cardID] = cardData

            $(cardButton).on("click", (item)=>{
                this.onClickCard(cardID)
            })
            
        })
        
    }

    setupGame(numberOfCards){
        // Current Selection
        this.selections = {
            firstSelection:null,
            secondSelection:null
        }

        // holds if its First or Second selection
        this.currentSelection = Constants.FIRST_SELECTION

        // If we want to enable the click on the cards
        this.isEnabled = true

        
        // We need (numberOfCards / 2) total pairs
        this.pairs = numberOfCards / 2
        
        // Create array of cards and shuffle them
        this.array = Array.from(Array(this.pairs).keys()).concat(Array.from(Array(this.pairs).keys()))
        this.array = this.array.map( item => {return item + 1})
        this.array = this.shuffle(this.array)
        
        // Object to store card data
        

        this.array.map((cardTypeID, cardID)=>{
            //console.log(`cardTypeID: ${cardTypeID} cardID:${cardID}`)
            
            // New image
            const imageSrc =  `assets/imgs/Card-${cardTypeID}.png`
    
            //console.log(this.cards[cardID])
            
            // Change the image for the dom element
            this.cards[cardID].cardImage.attr("src",imageSrc)
            
            // Update type
            this.cards[cardID].type = cardTypeID
            // this.cards[cardID].id = cardID
            // this.cards[cardID].dom = $(`#card-${(cardID+1)}`)
            
            this.cards[cardID].state = Constants.HIDDEN
            this.cards[cardID].isLocked = false
            
        })
    }

    reset(){
        for(let cardID in this.cards){
            if(this.cards[cardID].state == Constants.REVEALED){
                // if card is revealed, hide it
                console.log(`Vamos a ocultar a ${cardID}`)
                this.hideCard(cardID)
            }
        }

        // holds if its First or Second selection
        this.currentSelection = Constants.FIRST_SELECTION

        // If we want to enable the click on the cards
        this.isEnabled = true
    }

    onClickCard(cardID){
        // Can't interact if it's processing
        if(!this.isEnabled){
            return
        }

        // Can't interact if the card is locked!
        if(this.cards[cardID].isLocked){
            return
        }

        // Reveal this card
        this.revealCard(cardID)

        // It's the first card selected or the second one?
        if(this.currentSelection == Constants.FIRST_SELECTION){
            // Store card value selected
            this.selections.firstSelection = cardID

            // Next is second selection
            this.currentSelection = Constants.SECOND_SELECTION
        }else if(this.currentSelection == Constants.SECOND_SELECTION){
            // Store card value selected

            this.selections.secondSelection = cardID

            // Next process the pair and wait 1 second
            this.processPair().then(()=>{
                // We have a match
                this.processMatch()
            }).catch((error)=>{
                // No match :(
                this.processMissmatch()    
            }).finally(()=>{
                // Restore user interaction
                this.isEnabled = true

                // Clear selections
                this.clearSelections()

                // Back to the first selection, ready for the user
                this.currentSelection = Constants.FIRST_SELECTION
            })
        }
    }

    processMatch(){
        // Lock the cards!
        this.lockCard(this.selections.firstSelection)
        this.lockCard(this.selections.secondSelection)
        // Send message of matched pair
        this.globalEvents.notify(GlobalEvents.ON_PAIR_MATCHED)

    }

    processMissmatch(){
        this.hideCard(this.selections.firstSelection)
        this.hideCard(this.selections.secondSelection)

        // Send message of unmatched pair
        this.globalEvents.notify(GlobalEvents.ON_PAIR_UNMATCHED)
    }

    lockCard(cardID){
        this.cards[cardID].isLocked = true
    }

    clearSelections(){
        this.selections = {
            firstSelection:null,
            secondSelection:null
        }
    }

    processPair(){
        // Block further interactivity until pair is resolved
        this.isEnabled = false

        // Let's assume they are a missmtch
        let areSameCards = false

        // Evaluate the max time to wait      
        let waitTime = this.waitMissmatchCards
        //console.log(`first selection type:${this.cards[this.selections.firstSelection].type} second selection type:${this.cards[this.selections.secondSelection].type}`)
        // Compare
        if(this.cards[this.selections.firstSelection].type == this.cards[this.selections.secondSelection].type){
            // We got a pair!
            areSameCards = true
            waitTime = this.waitMatchedCards
        }

        // Return a promise:
        // resolve -> if pair is a match
        // reject -> if pair is missmatch
        return new Promise((resolve, reject)=>{
            setInterval(()=>{
                if(areSameCards){
                    resolve()
                }else{
                    reject()
                }
            }, waitTime)
        })
    }

    revealCard(cardID){
        // Set the state of this card as revealed
        this.cards[cardID].state = Constants.REVEALED
        
        const intervalTime = 100
        setTimeout(()=>{
            // Swap z-indexes
            this.cards[cardID].changeZIndex(Card.BACK_CARD, this.hideZIndex)
            this.cards[cardID].changeZIndex(Card.FRONT_CARD, this.showZIndex)            
        }, intervalTime)
        
        anime({
            targets: this.cards[cardID].domID,
            rotateY: 180,
            duration:this.animationDuration
        });
    }

    hideCard(cardID){
        
        // Set the state of this card as hidden
        this.cards[cardID].state = Constants.HIDDEN
        //this.showZIndex = this.showZIndex + 1

        const intervalTime = 100
        setTimeout(()=>{
            // Swap z-indexes
            this.cards[cardID].changeZIndex(Card.BACK_CARD, this.showZIndex)
            this.cards[cardID].changeZIndex(Card.FRONT_CARD, this.hideZIndex)   
        }, intervalTime)

        anime({
            targets: this.cards[cardID].domID,
            rotateY: 0,
            duration:this.animationDuration
        });
        
    }

    
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
    
}

export default CardsController;