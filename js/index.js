import GlobalEvents from './helpers/GlobalEvents.js';
import Menu from './com/menu/Menu.js'
import GameController from './com/controller/GameController.js'

$(document).ready(function(){
    
    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        $(".container").css("display", "block")
        
        // Menu
        const menu = new Menu()

        // GameController
        const gameController = new GameController()
        
    })
    
});
