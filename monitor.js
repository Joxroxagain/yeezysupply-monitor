// const proxyUtil = require('../utils/proxy');
// const Shopify = require('./Shopify');
const Notifier = require('./notifier');
// const mongoose = require('mongoose');
// const fs = require('fs');

// const Seller = require('../models/Seller');
// const Product = require('../models/Product');
// const NewProduct = require('../models/NewProduct');
const moment = require('moment');
// const cheerio = require('cheerio');
// const md5 = require('md5');


const api = require("./api.js");


class Task {

    constructor(monitorData, config) {
        this.taskData = monitorData;
        this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.4 Safari/537.36';
        this.proxies = monitorData.proxies; /* Empty Array if there are none. */
        this.keywords = monitorData.keywords;
        this.url = monitorData.url;
        this.active = true;
        this.firstRun = true;
        this.intv = null;
        this.intervalCount = 0;
        this.poll = 10000; //monitorData.pollMS;
        this.sellerID = monitorData._id;
        this.ysMode = null;
    }

    async start() {

        let f;

        this.intv = setInterval(f = () => {

            // const randomProxy = (this.proxies.length > 0) ? this.proxies[Math.floor(Math.random() * this.proxies.length)] : null;
            const randomProxy = null;
            /* YeezySupply tings */



            /*

                upcoming - Single Product Page
                pw - password page
                live - product live

            */

            if (this.firstRun) {

                api.fetchYS(this.userAgent, randomProxy, this.mode, (err, data) => {
                    if (!err) {

                        this.mode = data.mode;
                        this.firstRun = false;
                        this.log('Initial Check Done @ ' + this.mode);

                        if (this.mode == 'live') {
                            Notifier.emit('live', data);
                        }

                    }
                });


            } else {

                api.fetchYS(this.userAgent, randomProxy, this.mode, (err, data) => {

                    if (!err) {

                        if (this.mode != data.mode) {
                            
                            this.mode = data.mode;
                            this.log('Mode Changed: ' + this.mode);

                            if (this.mode == 'live') {
                                Notifier.emit('live', data);
                            }
                        }

                    }
                });

            }

            this.intervalCount++;

        }, this.poll);

        f();

        
        Notifier.on('live', () => {
            this.log("LIVE PAGE DETECTED!")
            this.stop();
        }); 

    }

    async stop() {
        this.log('Stopped')
        this.active = false;
        global.needsRestart = false;
        clearInterval(this.intv);
    }

    async restart() {
        this.log('Restarting task after ban in 60 secondss...');
        this.active = false;
        global.needsRestart = false;
        clearInterval(this.intv);
        var that = this;
        setTimeout(function () {
            that.start();
        }, 60000);
    }


    log(msg, type) {

        var formatted = moment().format('MMMM Do YYYY h:mm:ss a')

        switch (type) {
            case 'error':
                console.error(`[${this.url}]: ` + msg);
                break;
            case 'info':
                console.info(`[${this.url}]: ` + msg);
                break;
            default:
                console.log(`[${this.url}]: ` + msg);
        }
        global.logs += `[${formatted}][${this.url}] ${msg}\n`
    }

}

module.exports = Task;