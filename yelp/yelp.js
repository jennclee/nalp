const Promise = require('bluebird')
const request = require('request')
const config = require('../config.js')
const nalp = require('../database')


module.exports.yelpRequest = (location) => {
  console.log('location in request: ', location)
  let options = {
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${location}&limit=50`,
	headers: {
	  'User-Agent': 'request',
	  'Authorization': `Bearer ${config.TOKEN}`
	},
	contentType: 'application/json'
  }

  return new Promise ( (resolve, reject) => {
  	request(options, (err, res, body) => {
	  if (err) {
	  	console.log('err: ', err)
	  	reject(err)
	  } else {	
	    let businessList = JSON.parse(body).businesses
	    resolve(businessList)
	  }
    })
  })
} 