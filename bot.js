const Notifier = require('./notifier');
const api = require("./api.js");

class Task {

    constructor(config) {
        this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.4 Safari/537.36';
        this.proxies = config.proxies; /* Empty Array if there are none. */
        this.active = true;
        this.firstRun = true;
        this.intv = null;
        this.intervalCount = 0;
        this.poll = config.pollMS;
    }

    async start() {


        Notifier.on('live', (data) => {
            this.log("LIVE PAGE DETECTED!")

            

            api.cartItem



            this.stop();
        }); 

    }

    async stop() {
        //TODO
    }

    log(msg, type) {

        var formatted = moment().format('MMMM Do YYYY h:mm:ss a')

        switch (type) {
            case 'error':
                console.error(msg);
                break;
            case 'info':
                console.info(msg);
                break;
            default:
                console.log(msg);
        }
    }

}

module.exports = Task;