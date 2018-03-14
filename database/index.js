const mysql = require('mysql');
const Sequelize = require('sequelize');
const categoryList = require('../categoryList.js')

const sequelize = new Sequelize('nalp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: false
})

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully!') )
  .catch(err => console.error('Unable to connect to the database:', err) )


const Restaurant = sequelize.define('restaurant', {
  id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true },
  address: Sequelize.STRING,
  yelp_link: Sequelize.STRING,
  image_url: Sequelize.STRING,
  popularity: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  price: Sequelize.STRING
})



const Category = sequelize.define('category', {
  id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, unique: true }
})


const Restaurant_Category = sequelize.define('restaurant_category', {
  restaurant_id : { 
    type: Sequelize.INTEGER, 
    references: {
        model: Restaurant,
        key: 'id' 
    }
  },
  category_id: { 
    type: Sequelize.INTEGER, 
    references: {
        model: Category,
        key: 'id' }
    }
})




Restaurant.sync({force: true}).then(() => {
  console.log('Created Restaurant table')
}).then(() => {
  Category.sync({force: true}).then(() => {
    console.log('Created Category table')
    categoryList.categories.forEach((categoryItem) => {
        Category.create(categoryItem)
    })
  }).then(() => {
  	Restaurant_Category.sync().then(() => {
      console.log('Created Restaurant_Category table')
    })
  })
})

module.exports.save = (restaurants) => {
  let r_id, c_id
  restaurants.forEach((restaurant) => {
  	let catList = restaurant.categories
  	let catListArr = [];
  	catList.forEach((category) => {
      catListArr.push(category.title)
  	})
    Category.findAll({
      where: {
        title: catListArr
      }
    }).then((category) => {
      const restAddress = restaurant.location.display_address.join(' ')
      Restaurant.create({
      	name: restaurant.name,
      	address: restAddress,
      	yelp_link: restaurant.url,
      	image_url: restaurant.image_url,
      	popularity: 1,
      	rating: restaurant.rating,
      	price: restaurant.price
      }).then((restaurant) => {
      	restaurant.save()
      	r_id = restaurant.id
        if ( category.length === 1 ) {
          c_id = category[0].dataValues.id
          	Restaurant_Category.create({
          	  restaurant_id: r_id,
          	  category_id: c_id
          	}).then((rest_cat) => {
          	  rest_cat.save()
	        })
        } else if ( category.length > 1 ) {
      	  category.forEach((category) => {
      	    c_id = category.dataValues.id
          	Restaurant_Category.create({
          	  restaurant_id: r_id,
          	  category_id: c_id
          	}).then((rest_cat) => {
          	  rest_cat.save()
	        })
	      })
      	}
      })
    })
  })
}

module.exports.retrieve = (categories) => {
  return new Promise( (resolve, reject) => {
  	resolve(
  	  sequelize.query('SELECT restaurants.* FROM restaurants INNER JOIN restaurant_categories ON restaurants.id = restaurant_categories.restaurant_id INNER JOIN categories ON categories.id = restaurant_categories.category_id WHERE categories.title NOT IN (\"' + categories + '\") GROUP BY restaurants.id LIMIT 5')
  	)
  })
}


// TODO
// query combos
// top 10 clicked on restaurants
// user info (name, pref categories, location)

