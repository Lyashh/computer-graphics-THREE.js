
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import React from 'react';
import ComponentSwitch from './switch'
import {Container} from 'react-bootstrap'


class App extends React.Component {
  render() {
    return(
      <Container fluid={true}>
        <ComponentSwitch />
      </Container>
    )
  }
}

export default App;
