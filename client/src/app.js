import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import Filters from './components/Filters'
import Location from './components/Location'
import RestaurantList from './components/RestaurantList'

const $ = require('jquery')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      location: '',
      showCategory: false,
    }
  }

  setLocation = (location) => {
    this.setState({ location })
  }

  locationSearch = () => {
    const { location, showCategory } = this.state
    this.setState({ showCategory: !showCategory })
    console.log('location entered: ', location)
    $.ajax({
      method: 'POST',
      url: '/loc',
      data: JSON.stringify({ location }),
      contentType: 'application/json',
      success: (data) => {
        console.log('successfully queried for location')
        console.log('ajax POST success res: ', data)
      },
      error: (err) => {
        console.log('failed to query for location: ', err)
      },
    })
  }

  categorySearch = (categories) => {
    $.ajax({
      method: 'GET',
      url: '/loc',
      data: { categories: categories.join(',') },
      contentType: 'application/json',
      success: (data) => {
        console.log('successfully queried categories')
        console.log('ajax GET success res: ', data)
        this.setState({
          restaurants: data,
        })
      },
      error: (err) => {
        console.log('failed to query for categories: ', err)
      },
    })
  }

  render() {
    const { restaurants, showCategory } = this.state
    return (
      <div>
        <h1>Nelp</h1>
        <br />
        <Location
          setLocation={this.setLocation}
          locationSearch={this.locationSearch}
          showCategory={showCategory}
          categorySearch={this.categorySearch}
        />
        <br />
        <br />
        <br />
        <RestaurantList restList={restaurants} />
        <br />
        <br />
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<App />, app)
