const mysql = require('mysql')
const config = require('../config')
const { CategoryQuery, RestaurantQuery, RestaurantCategoryQuery } = require('../models/index')
const categoryList = require('../categoryList.json')

const db = mysql.createConnection({
  host: 'localhost',
  user: config.dbUser,
  password: config.dbPw,
})

db.connect((err) => {
  if (err) console.log('Error connecting...', err)
  console.log('Woohoo! Connected to the DB!')
  db.query('CREATE DATABASE IF NOT EXISTS nalp', (err) => {
    if (err) console.log('Error creating DB: ', err)
    db.query('USE nalp', (err) => {
      if (err) console.log('Error using DB: ', err)
      db.query('DROP TABLE IF EXISTS restaurant', (err) => {
        if (err) console.log('Error dropping restaurant table')
        db.query(RestaurantQuery, (err) => {
          if (err) console.log('Error creating restaurant table')
          db.query('DROP TABLE IF EXISTS category', (err) => {
            if (err) console.log('Error dropping category table')
            db.query(CategoryQuery, (err) => {
              if (err) console.log('Error creating category table: ', err)
              categoryList.categories.forEach((category) => {
                db.query(`INSERT INTO category (slug, name) VALUES (${category.slug}, ${category.name})`)
              })
              db.query('DROP TABLE IF EXISTS restaurant_category', (err) => {
                if (err) console.log('Error dropping restaurant_category table')
                db.query(RestaurantCategoryQuery, (err) => {
                  if (err) console.log('Error creating restaurant_category table: ', err)
                })
              })
            })
          })
        })
      })
    })
  })
})

const saveRestaurant = 'REPLACE INTO restaurants (name, address, yelp_link, image_url, popularity, rating, price) VALUES (?)'

const saveRestaurantCategory = 'REPLACE INTO restaurant_categories (restaurant_id, category_id) VALUES (?)'

module.exports.save = (restaurants) => {
  restaurants.forEach((restaurant) => {
    const restaurantInfo = [
      restaurant.name,
      restaurant.location.display_address.join(' '),
      restaurant.url,
      restaurant.image_url,
      1,
      restaurant.rating,
      restaurant.price,
    ]
    db.query(saveRestaurant, [restaurantInfo], (err) => {
      if (err) return `Error saving restaurant ${err}`
      db.query(`SELECT * FROM restaurants WHERE name = '${restaurant.name}'`, (err, restaurantResults) => {
        restaurant.categories.forEach((category, index) => (
          db.query(`SELECT * FROM categories WHERE name = '${restaurant.categories[index].title}'`, (err, categoryResults) => {
            db.query(saveRestaurantCategory, [restaurantResults[0].id, categoryResults[0].id])
          })
        ))
      })
    })
  })
}

module.exports.find = (table, column, param) => new Promise((resolve) => {
  resolve(
    db.query(`SELECT * FROM ${table} WHERE ${column} = ${param}`)
  )
})

module.exports.retrieve = categories => new Promise((resolve) => {
  resolve(
    db.query(`SELECT restaurants.* FROM restaurants INNER JOIN restaurant_categories ON restaurants.id = restaurant_categories.restaurant_id INNER JOIN categories ON categories.id = restaurant_categories.category_id WHERE categories.title NOT IN ("${categories}") GROUP BY restaurants.id LIMIT 5`)
  )
})


// TODO
// query combos
// top 10 clicked on restaurants
// user info (name, pref categories, location)

