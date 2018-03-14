import React from 'react'
import ReactDOM from 'react-dom'
import Filters from './Filters.js'

class CategorySearch extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      category: '',
      categories: [],
      render: false
  	}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.applyCategories = this.applyCategories.bind(this)
  }
  
  handleChange(event) {
    this.setState({
      category: event.target.value
    })
  }
  
  handleSubmit(event) {
    this.state.categories.push(this.state.category)
    this.setState({
      render: true
    })
    event.preventDefault()
  }

  // on another submit button
  applyCategories(event) {
    this.props.catSearch(this.state.categories)
    // this.setState({
    //   categories: []
    // })
    event.preventDefault()
  }

  render() {
    const divStyle = {
      display: 'inline'
    }
  	return (
  		<div>
        <h5>Category:</h5>
        <form>
  			  <input id="catSearch" type="text" value={this.state.text} onChange={this.handleChange}/>
  			  <button type="submit" onClick={this.handleSubmit}>Add Category</button>
        </form>
        <br/>
        <div style={divStyle}>
          { this.state.render ? <Filters cat={this.state.categories} /> : null }
        </div>
        <br/>
        <button type="submit" onClick={this.applyCategories}>Apply Category Filters</button>
        <br/>
  		</div>
  	)
  }
}

export default CategorySearch;