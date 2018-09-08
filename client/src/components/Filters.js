import React from 'react'
import PropTypes from 'prop-types'
import FilterItem from './FilterItem'

const Filters = ({ categories }) => (
  <div>
    {categories.map(category => <FilterItem category={category} key={category} />)}
  </div>
)

export default Filters

Filters.propTypes = {
  categories: PropTypes.instanceOf(Array),
}

Filters.defaultProps = {
  categories: [],
}
