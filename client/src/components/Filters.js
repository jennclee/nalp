import React from 'react'
import ReactDOM from 'react-dom'
import FilterItem from './FilterItem.js'

const Filters = (props) => (
  <div>
    {props.cat.map( (cat, index) => <FilterItem cat={cat} key={index}/> )}
  </div>
)

export default Filters;