// const proxyUtil = require('../utils/proxy');
// const Shopify = require('./Shopify');
const Notifier = require('./notifier');
// const mongoose = require('mongoose');
// const fs = require('fs');
const Discord = require("./discord.js");
// const Seller = require('../models/Seller');
// const Product = require('../models/Product');
// const NewProduct = require('../models/NewProduct');
const moment = require('moment');
// const cheerio = require('cheerio');
// const md5 = require('md5');


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
                            for (let index = 0; index < data.variants.length; index++) {
                                const size = data.variants[index].option1;
                                const id = data.variants[index].id;
                                const link = 'https://yeezysupply.com/cart/';
                                const postData = '?previous_step=shipping_method&step=payment_method';
                                const message = "Size " + size + " : " + link + id + ':1' + postData;
                                // Discord.post(message)
                                console.log(message);
                            } 
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
                                for (let index = 0; index < data.variants.length; index++) {
                                    const size = data.variants[index].option1;
                                    const id = data.variants[index].id;
                                    Discord.post(size + " : " + `https://yeezysupply.com/cart/${id}:1?previous_step=shipping_method&step=payment_method`)
                                } 
                                Notifier.emit('live', data);
                            }
                        }

                    }
                });

            }

            this.intervalCount++;

        }, this.poll);

        f();

        Notifier.on('live', (data) => {
            this.stop();
        }); 

    }

    async stop() {
        this.log('Stopped')
        this.active = false;
        global.needsRestart = false;
        clearInterval(this.intv);
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