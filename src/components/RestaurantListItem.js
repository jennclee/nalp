import React from 'react'
import ReactDOM from 'react-dom'

class RestaurantListItem extends React.Component {
  constructor(props) {
  	super(props)
  }

  render() {
    const divStyle = {
  	  border: '1px solid gray'
    }
    return (
  	  <div>
		<div className="container row" style={divStyle}>
	      <div className="col-sm-3">
	        <img src={this.props.rest.image_url} width="100px"/>
	      </div>
	      <div className="col-sm">
	        <h4><a href={this.props.rest.yelp_link} target="_blank">{this.props.rest.name}</a></h4>
	        <p>{this.props.rest.address}</p>
	        <p>Rating: {this.props.rest.rating} / 5</p>
	        <p>Price: {this.props.rest.price}</p>
	      </div>
	    </div>
	    <br/>
	  </div>
	)
  }
}

export default RestaurantListItem;