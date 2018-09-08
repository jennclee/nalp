import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import Filters from './components/Filters'
import Location from './components/Location'
import RestaurantList from './components/RestaurantList'
import CategorySearch from './components/CategorySearch'
import { Header } from './styled/Header'
import { Main } from './styled/Containers'

const $ = require('jquery')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      location: '',
      showCategory: false,
      category: '',
      categories: [],
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

  updateCategory = (category) => {
    this.setState({ category })
  }

  addCategory = () => {
    const { category } = this.state
    let { categories } = this.state
    categories = [...categories, category]
    this.setState({ categories })
  }

  categorySearch = () => {
    const { categories } = this.state
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
    const { restaurants, showCategory, categories } = this.state
    return (
      <div>
        <Header>Nalp</Header>
        <Main>
          <Location
            setLocation={this.setLocation}
            locationSearch={this.locationSearch}
          />
          <br />
          { showCategory
            ? (
              <CategorySearch
                updateCategory={this.updateCategory}
                addCategory={this.addCategory}
                categorySearch={this.categorySearch}
                categories={categories}
              />)
            : null }
          <br />
          <br />
          <RestaurantList restaurants={restaurants} />
        </Main>
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<App />, app)
