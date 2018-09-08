import React from 'react'
import PropTypes from 'prop-types'

const FilterItem = ({ category }) => {
  const filterStyle = {
    float: 'left',
    width: '100px',
    border: '1px solid gray',
    backgroundColor: '#C9C9C9',
    margin: '5px',
  }

  return (
    <div>
      <div style={filterStyle}>{category}</div>
      <br />
    </div>
  )
}

export default FilterItem

FilterItem.propTypes = {
  category: PropTypes.instanceOf(String),
}

FilterItem.defaultProps = {
  category: '',
}
