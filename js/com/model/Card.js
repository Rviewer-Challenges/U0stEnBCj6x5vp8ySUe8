import GlobalEvents from "../../helpers/GlobalEvents.js"
import Constants from "../../helpers/Constants.js"

class Card {

    constructor({id, type, backImage, cardImage, state, isLocked, dom}) {
        this.id = id
        this.type = type
        this.backImage = backImage
        this.cardImage = cardImage
        this.state = state
        this.isLocked = isLocked
        this.dom = dom

        this.domID = `#card-${(Number(id)+1)}`
    }

    updateImage(imageSrc){
        this.cardImage.attr("src",imageSrc)
    }
   
    changeZIndex(cardType, newZIndex){
        if(cardType == Card.BACK_CARD){
            this.backImage.css("z-index", newZIndex)
            
        }else if(cardType == Card.FRONT_CARD){
            this.cardImage.css("z-index", newZIndex)
        }
    }

}

Card.BACK_CARD = "BACK_CARD"
Card.FRONT_CARD = "FRONT_CARD"

export default Card;