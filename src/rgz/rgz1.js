
import React from 'react';
import {Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import InputComponent from '../forms/rgz1Input' 
import {    hsv2rgbFormat, rgb2HsvFormat, 
            yuv2rgbFormat, rgbToYuvFormat, 
            rgb2cmyFormat, cmy2rgbFormat, cmy2cmykFormat } from '../colorsFormat/colorsFormat'

class Rgz1 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rgb: {r: 0, g: 0, b: 0},
            yuv: {y: 0, u: 0, v: 0},
            hsv: {h: 0, s: 0, v: 0},
            yuv2rgb: {r: 0, g: 0, b: 0},
            hsv2rgb: {r: 0, g: 0, b: 0},
            rgb2cmy: {c: 0, m: 0, y: 0},
            cmy2rgb: {r: 0, g: 0, b: 0},
            cmy2cmyk: {c: 0, m: 0, y: 0, k: 0} 
        }
    }

    handleRGB = (e) => {
        let value = 0
        if(e.target.value >= 0 && e.target.value <= 255) {
            let rgb = this.state.rgb
            
            if(e.target.value == 0) {
                value = 0             
            } else {
                value = e.target.value.replace(/^0+/, '')   
            }

            rgb[`${e.target.name}`] = Number(value)
            console.log(rgb);
            this.setState({rgb})
        }

        const hsv = rgb2HsvFormat(this.state.rgb.r, this.state.rgb.g, this.state.rgb.b)
        this.setState({hsv})

        const hsv2rgb =  hsv2rgbFormat(hsv.h, hsv.s, hsv.v)
        this.setState({hsv2rgb})

        const rgbToYuv = rgbToYuvFormat(this.state.rgb.r, this.state.rgb.g, this.state.rgb.b)
        this.setState({yuv: rgbToYuv})

        const yuv2rgb = yuv2rgbFormat( parseInt(rgbToYuv.y), parseInt(rgbToYuv.u), parseInt(rgbToYuv.v))
        this.setState({yuv2rgb})

        const rgb2cmy = rgb2cmyFormat(this.state.rgb.r, this.state.rgb.g, this.state.rgb.b)
        this.setState({rgb2cmy})

        const cmy2rgb = cmy2rgbFormat(rgb2cmy.c, rgb2cmy.m, rgb2cmy.y)
        this.setState({cmy2rgb})

        const cmy2cmyk = cmy2cmykFormat(rgb2cmy.c, rgb2cmy.m, rgb2cmy.y)
        this.setState({cmy2cmyk})

        e.target.value = value
    }

  render() {
    let hsvComponent = (<InputComponent from="RGB"
                                        to="hsv"
                                        color={this.state.hsv} 
                                        procent={"%"} />)

    let yuvComponent =  <InputComponent from="RGB"
                                        to="yuv"
                                        color={this.state.yuv} 
                                        procent={""}/>

    let yuv2rgbComponent = <InputComponent  from="YUV"
                                            to="rgb"
                                            color={this.state.yuv2rgb} 
                                            procent={""}/>

    let hsv2rgbComponent = <InputComponent  from="HSV"
                                            to="rgb"
                                            color={this.state.hsv2rgb} 
                                            procent={""}/>

    let rgb2cmy =           <InputComponent from="RGB"
                                            to="cmy"
                                            color={this.state.rgb2cmy} 
                                            procent={""}/>

    let cmy2rgb =          <InputComponent  from="CMY"
                                            to="rgb"
                                            color={this.state.cmy2rgb} 
                                            procent={""}/>

    let cmy2cmyk = (
        <div>
            <h3 className="rgz_h3"> CMY to CMYK </h3>
            <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                               C
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl  className="rgzCmykInput" value={this.state.cmy2cmyk.c}/>
                                        
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                               M
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl  className="rgzCmykInput" value={this.state.cmy2cmyk.m}/>

                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Y
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl  className="rgzCmykInput" value={ this.state.cmy2cmyk.y}/>

                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                K
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl  className="rgzCmykInput" value={this.state.cmy2cmyk.k}/>
            </InputGroup>
        </div>
    )

    return(
        <div>
            <Container fluid={true} className="colorContainer" 
                style={{backgroundColor: `rgb(${this.state.rgb.r}, ${this.state.rgb.g}, ${this.state.rgb.b})`}}>
            </Container>

            <Container className="rgzContainer">
                <Row>
                    <Col md={5} className="rgzCol">
                        <h3 className="rgz_h3">Input <span className="rgbTitle">RGB</span></h3>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>R</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl    className="rgzInput" 
                                            defaultValue={this.state.rgb.r}
                                            type="number"
                                            onChange={this.handleRGB}
                                            name="r"/>
                                            
                            <InputGroup.Prepend>
                                <InputGroup.Text>G</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl   className="rgzInput" 
                                            defaultValue={this.state.rgb.g}
                                            type="number"
                                            onChange={this.handleRGB}
                                            name="g"/>

                            <InputGroup.Prepend>
                                <InputGroup.Text>B</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl   className="rgzInput" 
                                            defaultValue={this.state.rgb.b}
                                            type="number"
                                            onChange={this.handleRGB}
                                            name="b"/>
                        </InputGroup>
                        {rgb2cmy}
                        {cmy2rgb}
                        {cmy2cmyk}

                        
                    </Col>
                    <Col md={1} className="rgzCol"> </Col>
                    <Col md={6} className="rgzCol">
                        {yuvComponent}
                        {yuv2rgbComponent}
                        {hsvComponent}
                        {hsv2rgbComponent}
                    </Col>
                </Row>
            </Container>
      </div>
    )
  }
}

export default Rgz1;
