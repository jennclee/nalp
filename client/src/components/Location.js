import React from 'react'
import PropTypes from 'prop-types'
import { SubmitButton } from '../styled/Buttons'

const Location = ({
  setLocation, locationSearch,
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
      <SubmitButton type="submit" onClick={handleSubmit}>Enter</SubmitButton>
      <br />
    </div>
  )
}

export default Location

Location.propTypes = {
  setLocation: PropTypes.func.isRequired,
  locationSearch: PropTypes.func.isRequired,
}
