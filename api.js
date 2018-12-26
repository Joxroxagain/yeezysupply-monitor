const request = require('request');
const cheerio = require('cheerio');

let API = {};


API.fetchYS = function (userAgent, proxy, mode, callback) {

	request({
		method: 'get',
		url: 'https://yeezysupply.com/',
		proxy: proxy,
		gzip: true,
		followRedirect: true,
		headers: {
			'User-Agent': userAgent
		}
	}, (err, resp, body) => {

		if (err) return callback(err, null);

		let $ = cheerio.load(body, {xmlMode: true});
		let data;

		if (body.toLowerCase().indexOf('TOMORROW') > -1 || body.toLowerCase().indexOf('TODAY') > -1) {
			data = {
				pageURL: resp.request.uri.href,
				img: 'http://' + $('img[class="MP__scrollable_img js-scrollable-img"]').attr('src'),
				title: (mode == null) ? "Monitor Started @ Upcoming Page" : `Upcoming Page Live for "${$('div[itemprop="name"]').text()}"!`,
				mode: 'upcoming',
				variants: null
			}
			return callback(null, data);
		}

		if (body.toLowerCase().indexOf('/cart/add') > -1 && resp.request.uri.path == '/') {

			API.parseVariantsYS(body.toLowerCase(), (err, variants) => {
				data = {
					pageURL: resp.request.uri.href,
					img: 'http://' + $('img[class="MP__scrollable_img js-scrollable-img"]').attr('src'),
					title: (mode == null) ? "Monitor Started @ Cart Page" : `Page Live for "${$('div[itemprop="name"]').text()}"!`,
					mode: 'live',
					variants: variants
				}
				return callback(null, data);
			});

		}

		if (resp.request.uri.path == '/password') {
			data = {
				pageURL: resp.request.uri.href,
				img: null,
				title: (mode == null) ? 'Monior Started @ Password Page' : 'Password Page Live',
				mode: 'pw',
				variants: null
			}
			return callback(null, data);
		}

	})

}

API.parseVariantsYS = function (body, callback) {

	let $ = cheerio.load(body);

	//Load up all the JSON
	let parsedObjects = [];
	$('script:not([src])').each((i, e) => {
		s = e.children[0].data;
		console.log(s)
		if (s.startsWith('{"id":'))
			parsedObjects.push(JSON.parse(s));
	});

	// let parsedObjects = [];
	// let fields = [];

	// let arr = body.toString().split('variants.push(').map(x => x.replace(");", ""))
	// arr.shift();

	// let formatJSON = (object, fields) => {

	// 	for (let i = 0; i < fields.length; i++) {
	// 		object = object.replace(fields[i], `"${fields[i]}"`);
	// 	}

	// 	return JSON.parse(object);

	// }

	// let fetchFields = objectStr => {
	// 	objectStr.trim();
	// 	let newArr = objectStr.split(':').map(x => x.trim());
	// 	let list = [];
	// 	for (let i = 0; i < newArr.length; i++) {
	// 		if (i != (newArr.length - 1)) {
	// 			let fieldName = newArr[i].split('\n')[newArr[i].split('\n').length - 1].replace(/ /g, '');
	// 			list.push(fieldName)
	// 		}
	// 	}
	// 	return list;
	// }

	// for (let i = 0; i < arr.length; i++) {
	// 	if (arr[i].indexOf('options') > -1) {
	// 		if (i == (arr.length - 1)) {
	// 			let obj = arr[i].split("}")[0] + "}";
	// 			let fields = fetchFields(obj);
	// 			parsedObjects.push(formatJSON(obj, fields));
	// 		} else {
	// 			let obj = arr[i];
	// 			let fields = fetchFields(obj);
	// 			parsedObjects.push(formatJSON(obj, fields));
	// 		}
	// 	}
	// }

	return callback(null, parsedObjects);

}


function tryParseJSON(jsonString) {
	try {
		let o = JSON.parse(jsonString);
		if (o && typeof o === "object") {
			return o;
		}
	} catch (e) { }
	return false;
}

module.exports = API;