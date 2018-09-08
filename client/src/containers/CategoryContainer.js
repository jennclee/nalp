import React from 'react'
import PropTypes from 'prop-types'
import CategorySearch from '../components/CategorySearch'
import { SubPage } from '../styled/Containers'

const CategoryContainer = ({
  updateCategory, addCategory, categorySearch, categories,
}) => (
  <SubPage>
    <CategorySearch
      updateCategory={updateCategory}
      addCategory={addCategory}
      categorySearch={categorySearch}
      categories={categories}
    />
  </SubPage>
)

export default CategoryContainer
