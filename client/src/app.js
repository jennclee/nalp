import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import Filters from './components/Filters'
import Location from './components/Location'
import ResultsContainer from './containers/ResultsContainer'
import CategoryContainer from './containers/CategoryContainer'
import { Header } from './styled/Header'
import { Main } from './styled/Containers'

const $ = require('jquery')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      location: '',
      category: '',
      categories: [],
      view: 'location',
    }
  }

  setLocation = (location) => {
    this.setState({ location })
  }

  locationSearch = () => {
    const { location } = this.state
    this.setState({ view: 'category' })
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
    this.setState({ view: 'results' })
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
    const { restaurants, categories, view } = this.state
    return (
      <div>
        <Header>APP HEADER</Header>
        <Main>
          { view === 'location'
            ? (
              <Location
                setLocation={this.setLocation}
                locationSearch={this.locationSearch}
              />)
            : null }
          { view === 'category'
            ? (
              <CategoryContainer
                updateCategory={this.updateCategory}
                addCategory={this.addCategory}
                categorySearch={this.categorySearch}
                categories={categories}
              />)
            : null }
          { view === 'results'
            ? (
              <ResultsContainer restaurants={restaurants} />)
            : null }
        </Main>
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<App />, app)
