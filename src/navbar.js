import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'


class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: props.id
    }

  }
   render() {
    let tabs = []
    for (let index = 0; index < 10; index++) {
      let temp = index
      ++temp
      let tab = (<li className={temp == this.state.selected ? 'selected' : ''}>Lab {temp}</li>)
      tabs.push(tab)
    }
    const renderTabs = tabs.map(el => el)
    
    return(

      
      <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="tab">
              <ul className="inline" >
                {renderTabs}
              </ul>
          </div>
          <Link to="/a/a">AAA</Link>
        </Col>
      </Row>
    </Container>

    )
  }
}

export default Navbar;
