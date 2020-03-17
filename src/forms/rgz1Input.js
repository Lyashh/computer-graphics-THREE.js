
import React from 'react';
import {InputGroup, FormControl} from 'react-bootstrap'


class App extends React.Component {
    constructor(props) {
        super(props)
    }

  render() {
      let from
      if(this.props.from === 'RGB') {
        from = <span className="rgbTitle">{this.props.from}</span>
      } else {
        from = <span>{this.props.from}</span>
      }

      let to
      if(this.props.to === 'rgb') {
        to = <span className="rgbTitle">{ this.props.to.toUpperCase() }</span>
      } else {
        to = <span>{ this.props.to.toUpperCase() }</span>
      }

    return(
        <div>
            <h3 className="rgz_h3"> {from} to {to} </h3>
            <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                { this.props.to['0'].toUpperCase() }
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl  className="rgzInput" value={`${this.props.color[this.props.to['0']]}${this.props.procent} `}/>
                                        
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                { this.props.to['1'].toUpperCase() }
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl  className="rgzInput" value={ `${this.props.color[this.props.to['1']]}${this.props.procent}` }/>

                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                { this.props.to['2'].toUpperCase() }
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl  className="rgzInput" value={ `${this.props.color[this.props.to['2']]}${this.props.procent}` }/>
            </InputGroup>
        </div>
    )
  }
}

export default App;
