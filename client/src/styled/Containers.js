import styled from 'styled-components'

const Main = styled.div`
  font-size: 1em;
  color: black;
  padding: 0.5em;
  font-family: 'Open Sans', sans-serif;
`

const SubPage = styled(Main)`
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background: #8CA3FF;
  background-repeat: no-repeat;
  background: -webkit-linear-gradient(#8CA3FF, #FF9686);
  background: -moz-linear-gradient(#8CA3FF, #FF9686);
  background: -ms-linear-gradient(#8CA3FF, #FF9686);
  background: -o-linear-gradient(#8CA3FF, #FF9686);
  background: linear-gradient(#8CA3FF, #FF9686);
  text-align: center;
`

export { Main, SubPage }
