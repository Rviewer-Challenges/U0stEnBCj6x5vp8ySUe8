class GlobalEvents {

    constructor() {
        // Para los eventos
        this.events = {};

    }

    // TODO Suscribirse a un evento con una función
    // Ahora: suscribirse con una función
    subscribe(event = "", func) {
        if(this.events[event] == undefined){
            this.events[event] = []
        }

        this.events[event].push(func)
    }
     
    // TODO Desuscribirse a un evento con una función
    // Ahora: desuscribirse con una función
    unsubscribe(event = "", func) {
        if(this.events[event] != undefined){
            this.events[event] = this.events[event].filter((observer) => observer !== func)
        }
    }
     
    // Ahora: notifica siempre a todos los suscritores, no admite distinción del evento
    notify(event = "", data) {
        // Cuidado! No podemos notificar si no hay nadie escuchando este evento
        this.events[event]?.forEach((observer) => observer(data));
    }

}

GlobalEvents.myInstance = null
GlobalEvents.getInstance = ()=>{
    if(GlobalEvents.myInstance == null){
        GlobalEvents.myInstance = new GlobalEvents()   
    }
    
    return GlobalEvents.myInstance
}

GlobalEvents.ON_PROGRESS_LOADING = "ON_PROGRESS_LOADING"
GlobalEvents.ON_LOADING_COMPLETED = "ON_LOADING_COMPLETED"
GlobalEvents.ON_DIFFICULTY_SELECTED = "ON_DIFFICULTY_SELECTED"
GlobalEvents.ON_COUNT_DOWN = "ON_COUNT_DOWN"
GlobalEvents.ON_COUNT_DOWN_COMPLETED = "ON_COUNT_DOWN_COMPLETED"
GlobalEvents.ON_PAIR_MATCHED = "ON_PAIR_MATCHED"
GlobalEvents.ON_PAIR_UNMATCHED = "ON_PAIR_UNMATCHED"
GlobalEvents.ON_REPLAY_CLICKED = "ON_REPLAY_CLICKED"
GlobalEvents.ON_EXIT_CLICKED = "ON_EXIT_CLICKED"



export default GlobalEvents;