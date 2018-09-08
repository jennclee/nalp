import React from 'react'
import PropTypes from 'prop-types'
import { SubmitButton } from '../styled/Buttons'
import { SubPage } from '../styled/Containers'
import { SubHeader } from '../styled/Header'

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
    <SubPage>
      <SubHeader>Welcome! Enter a location to search for restaurants</SubHeader>
      <input id="location" type="text" onChange={handleChange} />
      <SubmitButton type="submit" onClick={handleSubmit}>Enter</SubmitButton>
    </SubPage>
  )
}

export default Location

Location.propTypes = {
  setLocation: PropTypes.func.isRequired,
  locationSearch: PropTypes.func.isRequired,
}
