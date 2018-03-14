import React from 'react'
import ReactDOM from 'react-dom'

class FilterItem extends React.Component {
  constructor(props) {
  	super(props)
  }

  render() {
  	const filterStyle = {
      float: 'left',
      width: '100px',
      border: '1px solid gray',
      backgroundColor: '#C9C9C9',
      margin: '5px'
    }
    // const afterFilter = {
    // 	clear: 'left'
    // }

  	return (
  	  <div>
        <div style={filterStyle}>{this.props.cat}</div>
        <br/>
      </div>
  	)
  }
}

export default FilterItem;