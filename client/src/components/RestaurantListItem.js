import React from 'react'
import PropTypes from 'prop-types'

const RestaurantListItem = ({ restaurant }) => {
  const divStyle = {
    border: '1px solid gray',
  }

  return (
    <div className="container row" style={divStyle}>
      <div className="col-sm-3">
        <img src={restaurant.image_url} width="100px" alt="food" />
      </div>
      <div className="col-sm">
        <h4><a href={restaurant.yelp_link} target="ww1">{restaurant.name}</a></h4>
        <p>{restaurant.address}</p>
        <p>
          Rating:&nbsp;
          {restaurant.rating}
          &nbsp;/ 5
        </p>
        <p>
          Price:&nbsp;
          {restaurant.price}
        </p>
      </div>
      <br />
    </div>
  )
}

export default RestaurantListItem

RestaurantListItem.propTypes = {
  restaurant: PropTypes.instanceOf(Object),
}

RestaurantListItem.defaultProps = {
  restaurant: {},
}
