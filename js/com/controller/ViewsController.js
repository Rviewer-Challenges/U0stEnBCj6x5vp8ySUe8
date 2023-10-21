import GlobalEvents from "../../helpers/GlobalEvents.js"

class ViewsController {

    constructor() {
        // References to level selector and the game
        this.levelSelectorDiv = $("#level-selector-container")
        this.gameDiv = $("#game-container")
        
    }

    showView(newView)
    {
        switch(newView){
            case ViewsController.LEVEL_SELECTOR_CONTAINER:
                this.levelSelectorDiv.css("display", "grid")
                this.gameDiv.hide()
                break;
            case ViewsController.GAME_CONTAINER:
                this.levelSelectorDiv.hide()
                this.gameDiv.css("display", "grid")
                break;
        }
    }

    
}

ViewsController.LEVEL_SELECTOR_CONTAINER = "LEVEL_SELECTOR_CONTAINER"
ViewsController.GAME_CONTAINER = "GAME_CONTAINER"


export default ViewsController;