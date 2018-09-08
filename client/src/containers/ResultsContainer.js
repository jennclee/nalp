import React from 'react'
import PropTypes from 'prop-types'
import RestaurantList from '../components/RestaurantList'
import { SubPage } from '../styled/Containers'

const ResultsContainer = ({ restaurants }) => (
  <SubPage>
    <RestaurantList
      restaurants={restaurants}
    />
  </SubPage>
)

export default ResultsContainer
