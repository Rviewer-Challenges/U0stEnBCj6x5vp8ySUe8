import GlobalEvents from "../helpers/GlobalEvents.js"

class CountDown {

    constructor() {
        // References to level selector and the game
        this.counter = 0
        this.lapsedTime = 1000
        this.globalEvents = GlobalEvents.getInstance()
    }

    setCountDown(forSeconds)
    {
        this.counter = forSeconds

        this.start()
    }

    start(){
        this.timer = setTimeout(()=>{this.loop()},this.lapsedTime)
    }

    loop(){
        // Perform
        const newCounter = this.counter - 1

        if(newCounter == 0){
            // End of this Counter
            this.globalEvents.notify(GlobalEvents.ON_COUNT_DOWN, 0)
            this.globalEvents.notify(GlobalEvents.ON_COUNT_DOWN_COMPLETED, newCounter)
        }else{
            // Repeat process and send message
            this.timer = setTimeout(()=>{this.loop()},this.lapsedTime)

            this.globalEvents.notify(GlobalEvents.ON_COUNT_DOWN, newCounter)
        }

        this.counter = newCounter
    }

    cancel(){
        clearTimeout(this.timer);
    }

    
}

export default CountDown;