var cheerio = require('cheerio');
var request = require('request');
var querystring = require('querystring');
const api = require('./api.js');
var notifier = require('./notifier.js')


module.exports = class Monitor {

    constructor(options) {
        this.running = null;
        this.refreshInterval = options.interval;
    }

    start() {

        // Stop monitoring once new items are found
        notifier.on('live', () => {
            this.stopMonitoring();
        });

        running = setInterval(function () {
           
            if (this.firstRun) {

                Shopify.fetchYS(this.userAgent, randomProxy, this.mode, (err, data) => {
                    if (!err) {

                        if (global.config.discord.active) {
                            Notify.ys(global.config.discord.webhook_url, data);
                        }

                        this.mode = data.mode;
                        this.firstRun = false;
                        this.log('Initial Check Done @ ' + this.mode);

                    }
                });


            } else {

                Shopify.fetchYS(this.userAgent, randomProxy, this.mode, (err, data) => {
                    if (!err) {

                        if (this.mode != data.mode) {
                            if (global.config.discord.active) {
                                Notify.ys(global.config.discord.webhook_url, data);
                            }
                            this.mode = data.mode;
                            this.log('Mode Changed: ' + this.mode);
                        }

                    }
                });

            }

        }, 1000 * this.refreshInterval); // Every xx sec

    }

    stopMonitoring(callback) {
        clearInterval(running);
        // if (running == "") {
        //     callback(null, 'No watching processes found.');
        // } else {
        //     callback('Watching has stopped.', null);
        // }

    }

}

