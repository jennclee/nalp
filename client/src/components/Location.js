import React from 'react'
import PropTypes from 'prop-types'
import CategorySearch from './CategorySearch'

const Location = ({
  setLocation, locationSearch, showCategory, categorySearch,
}) => {
  const handleChange = (event) => {
    setLocation(event.target.value)
  }

  const handleSubmit = (event) => {
    locationSearch()
    event.preventDefault()
  }

  return (
    <div>
      <h5>Location:</h5>
      <input id="location" type="text" onChange={handleChange} />
      <input type="submit" onClick={handleSubmit} value="Enter" />
      <br />
      <br />
      { showCategory ? <CategorySearch categorySearch={categorySearch} /> : null }
    </div>
  )
}

export default Location

Location.propTypes = {
  setLocation: PropTypes.func.isRequired,
  locationSearch: PropTypes.func.isRequired,
  showCategory: PropTypes.bool.isRequired,
  categorySearch: PropTypes.func.isRequired,
}
