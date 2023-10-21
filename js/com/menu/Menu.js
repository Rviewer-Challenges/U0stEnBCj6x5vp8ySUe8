import GlobalEvents from "../../helpers/GlobalEvents.js"
import Constants from "../../helpers/Constants.js"

class Menu {

    constructor() {
        this.init()

        this.globalEvents = GlobalEvents.getInstance()
    }

    init(){
        $(".difficult-item").each((index, ref)=>{
            const button = $(ref).find("a")
            const buttonID = ref.id
            
            button.on("click", (el)=>{
                this.onClick(buttonID)
            })

        })
    }

    onClick(buttonID){
        let difficulty = ""

        if(buttonID == "easy"){
            difficulty = Constants.EASY
        }else if(buttonID == "medium"){
            difficulty = Constants.MEDIUM
        }else if(buttonID == "hard"){
            difficulty = Constants.HARD
        }

        this.globalEvents.notify(GlobalEvents.ON_DIFFICULTY_SELECTED, difficulty)
    }

}

export default Menu;