const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const Promise = require('bluebird')
const cors = require('cors')
const yelp = require('../yelp/yelp.js')
const nalp = require('../database')

const app = express()

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(cors())



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
})

db.connect((err) =>{
  if (err) console.log('Error connecting...', err)
  console.log('Woohoo! Connected to the DB!')
  db.query('CREATE DATABASE IF NOT EXISTS nalp', (err) => {
    if (err) console.log('Error creating DB: ', err); 
	  db.query('USE nalp', (err) => {
        if (err) console.log('Error using DB: ', err); 
	})
  })
})


app.post('/loc', (req, res) => {
  Promise.resolve(yelp.yelpRequest(req.body.location)).then((response) => {
  	console.log('results from Yelp: ', response)
    nalp.save(response)
  	res.status(201).send('POST successful')
  })
})

app.get('/loc', (req, res) => {
  let categoryList = req.url.substring(16)
  Promise.resolve(nalp.retrieve(categoryList)).then((response) => {
  	res.status(200).send(response[0])
  })
})

app.listen(8080, () => {
  console.log('App listening on port 8080!')
  console.log('Visit 127.0.0.1:8080 to view app')
})