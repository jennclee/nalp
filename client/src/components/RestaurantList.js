import React from 'react'
import PropTypes from 'prop-types'
import RestaurantListItem from './RestaurantListItem'

const RestaurantList = ({ restaurants }) => (
  <div>
    {restaurants.map(restaurant => (
      <RestaurantListItem restaurant={restaurant} key={restaurant.name} />
    ))}
  </div>
)

export default RestaurantList

RestaurantList.propTypes = {
  restaurants: PropTypes.instanceOf(Array),
}

RestaurantList.defaultProps = {
  restaurants: [],
}
