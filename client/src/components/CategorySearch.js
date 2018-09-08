import React from 'react'
import PropTypes from 'prop-types'
import Filters from './Filters'

const CategorySearch = ({
  categorySearch, updateCategory, addCategory, categories,
}) => {
  const handleChange = (event) => {
    updateCategory(event.target.value)
  }

  const handleSubmit = (event) => {
    addCategory()
    event.preventDefault()
  }

  const applyCategories = (event) => {
    categorySearch(categories)
    event.preventDefault()
  }

  return (
    <div>
      <h5>Category:</h5>
      <form>
        <input id="catSearch" type="text" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Add Category</button>
      </form>
      <br />
      <div>
        <Filters categories={categories} />
      </div>
      <br />
      <button type="submit" onClick={applyCategories}>Apply Category Filters</button>
      <br />
    </div>
  )
}

export default CategorySearch

CategorySearch.propTypes = {
  categorySearch: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  categories: PropTypes.instanceOf(Array),
}

CategorySearch.defaultProps = {
  categories: [],
}
