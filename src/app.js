import React from 'react'
import ReactDOM from 'react-dom'
import Filters from './components/Filters.js'
import Location from './components/Location.js'
import RestaurantList from './components/RestaurantList.js'
const $ = require('jquery')

class App extends React.Component {
  constructor(props) {
  	super(props)
    this.state = {
      restaurants: []
    }
  	this.locationSearch = this.locationSearch.bind(this)
    this.categorySearch = this.categorySearch.bind(this)
  }

  locationSearch(location) {
  	console.log('location entered: ', location)
  	$.ajax({
  		method: 'POST',
  		url: '/loc',
  		data: JSON.stringify({location: location}),
  		contentType: 'application/json',
  		success: (data) => {
  			console.log('successfully queried for location')
  			console.log('ajax POST success res: ', data)
  		},
  		error: (err) => {
  			console.log('failed to query for location')
  		}
  	})
  }

  categorySearch(categories) {
    $.ajax({
      method: 'GET',
      url: '/loc',
      data: {categories: categories.join(',')},
      contentType: 'application/json',
      success: (data) => {
        console.log('successfully queried categories')
        console.log('ajax GET success res: ', data)
        this.setState({
          restaurants: data
        })
      },
      error: (err) => {
        console.log('failed to query for categories')
      }
    })
  }

  render() {
    const divStyle = {
      margin: '5px'
    }
    return (
      <div style={divStyle}>
        <h1>Nelp</h1>
        <br/>
        <Location locSearch={this.locationSearch} catSearch={this.categorySearch}/>
        <br/>
        <br/>
        <br/>
        <RestaurantList restList={this.state.restaurants}/>
        <br/>
        <br/>
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<App />, app)
