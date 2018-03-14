import React from 'react'
import ReactDOM from 'react-dom'
import CategorySearch from './CategorySearch.js'

class Location extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      locValue: '',
      show: false
  	}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      locValue: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.locSearch(this.state.locValue)
    this.setState({
      show: true
    })
    event.preventDefault()
  }

  render() {
  	return (
  		<div>
        <h5>Location:</h5>
  			<input id="location" type="text" onChange={this.handleChange}/>
  			<input type="submit" onClick={this.handleSubmit} value="Enter"/>
        <br/>
        <br/>
        { this.state.show ? <CategorySearch catSearch={this.props.catSearch}/> : null }
  		</div>
  	)
  }
}

export default Location