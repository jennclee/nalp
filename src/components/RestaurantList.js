import React from 'react'
import ReactDOM from 'react-dom'
import RestaurantListItem from './RestaurantListItem.js'

const RestaurantList = (props) => (
  <div>
    {props.restList.map( (restaurant, index) => <RestaurantListItem rest={restaurant} key={index}/> )}
  </div>
)

export default RestaurantList;