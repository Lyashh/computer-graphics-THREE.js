import React from 'react'
import Lab1 from './labs/lab1'
import Lab2 from './labs/lab2'
import Lab3 from './labs/lab3'
import Lab4 from './labs/lab4'
import Lab5 from './labs/lab5'
import Lab6 from './labs/lab6'
import Lab7 from './labs/lab7'
import Lab8 from './labs/lab8'
import Lab9 from './labs/lab9'
import Rgz1 from './rgz/rgz1'
import Rgz2 from './rgz/rgz2'
import Rgz3 from './rgz/rgz3'


import {Container, Row, Col} from 'react-bootstrap'


class ComponentSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.components = {
      lab1: <Lab1/>,
      lab2: <Lab2/>,
      lab3: <Lab3/>,
      lab4: <Lab4/>,
      lab5: <Lab5/>,
      lab6: <Lab6/>,
      lab7: <Lab7/>,
      lab8: <Lab8/>,
      lab9: <Lab9/>,
      rgz1: <Rgz1 />,
      rgz2: <Rgz2 />,
      rgz3: <Rgz3 />

    }

    this.state = {
        currentComponent: 1,
        selected: 1
    }
  }

  componentDidMount() {
    this.setState({currentComponent: this.components.lab1})
    this.setState({selected: 1})
  }

  setComponent = (e) => {
    let component = this.components[`lab${e.target.value}`]
    this.setState({selected: e.target.value})
    this.setState({currentComponent: component})
  }

  setRgz1 = () => {
    this.setState({selected: 11})
    this.setState({currentComponent: this.components.rgz1})
  }

  setRgz2 = () => {
    this.setState({selected: 12})
    this.setState({currentComponent: this.components.rgz2})
  }

  setRgz3 = () => {
    this.setState({selected: 13})
    this.setState({currentComponent: this.components.rgz3})
  }

  render() {
    let tabs = []
    //FOR LAB TABS
    for (let index = 0; index < 9; index++) {
      let temp = index
      ++temp
      let tab = (<li  className={temp == this.state.selected ? 'selected' : ''}
                      key={temp}
                      value={temp}
                      onClick={this.setComponent}>
        Lab {temp}</li>)
      tabs.push(tab)
    }

    //RGZ 1 TAB
    let rgzTab1 = <li  className={11 == this.state.selected ? 'selected' : ''}
                      key="11"
                      onClick={this.setRgz1}>РГЗ 1</li>
    //RGZ 2 TAB
    let rgzTab2 = <li  className={12 == this.state.selected ? 'selected' : ''}
                      key="12"
                      onClick={this.setRgz2}>РГЗ 2</li>
                      
    let rgzTab3 = <li  className={13 == this.state.selected ? 'selected' : ''}
                      key="12"
                      onClick={this.setRgz3}>РГЗ 3</li>         
    tabs.push(rgzTab1)
    tabs.push(rgzTab2)
    tabs.push(rgzTab3)
    const renderTabs = tabs.map(el => el)

    return(
      <div>
            <Container>
              <Row className="justify-content-md-center">
                <Col md={10}>
                  <div className="tab">
                      <ul className="inline" >
                        {renderTabs}
                      </ul>
                  </div>
                </Col>
              </Row>
             </Container>

          	{this.state.currentComponent}
      </div>
    )
  }
}

export default ComponentSwitch;
