import React from 'react'
import * as THREE from 'three';
import {Container, Row, Col, Button, ButtonGroup} from 'react-bootstrap'

class Lab4 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            history: []
        }
    }

    async componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        await this.setState({history: [...this.state.history, `React component did mount`]})
        await this.setState({history: [...this.state.history, `Set width ${width}px`]})
        await this.setState({history: [...this.state.history, `Set height ${height}px`]})

        this.scene = new THREE.Scene()
        await this.setState({history: [...this.state.history, `Init THREE scene`]})

        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        //ZOOM
        this.camera.position.z = 4
        await this.setState({history: [...this.state.history, `Init Camera`]})
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        await this.setState({history: [...this.state.history, `Init WebGLRenderer`]})

        this.renderer.setSize(width, height)
        await this.setState({history: [...this.state.history, `Set WebGLRenderer size`]})

        this.mount.appendChild(this.renderer.domElement)
        this.renderer.setClearColor('rgb(128, 128, 255)')
        await this.setState({history: [...this.state.history, `Set WebGLRenderer color rgb(128, 128, 255)`]})



        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 'rgb(136, 176, 75)'})
        this.cube = new THREE.Mesh(geometry, material)
        await this.setState({history: [...this.state.history, `Init BoxGeometry with size (1, 1, 1) and MeshBasicMaterial`]})
        this.scene.add(this.cube)
        await this.setState({history: [...this.state.history, `Add Cube to Scene`]})

        //ADD EDGES
        const edges = new THREE.EdgesGeometry( geometry );
        this.line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black' } ) );
        this.scene.add(this.line)
        this.start()
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start = async () => {
        if (!this.frameId) {
            await this.setState({history: [...this.state.history, `Start Render And Animation`]})
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = async () => {
        await this.setState({history: [...this.state.history, `Cancel Animation and Render`]})
        cancelAnimationFrame(this.frameId)
    }

     animate = async() => {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        this.line.rotation.x += 0.01
        this.line.rotation.y += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = async () => {
        this.renderer.render(this.scene, this.camera)
    }

    continueAnimation = async () => {
        await this.setState({history: [...this.state.history, `Continue Render and Animation`]})
        this.animate()
    }

  render() {
    let history = this.state.history.map((el, i) => <p className="lab3text" key={i}>>>    {el}</p>)

    return(
    <Container>
        <Row>
            <Col md={8}>
                <div>
                    <div className="sceneContainer" ref={(mount) => { this.mount = mount }} />
                    <p className="sceneTitle">Лабораторна робота № 3:   
                        Налаштування процесу рендерингу</p>
                </div>
            </Col>
            <Col md={4}> 
                <ButtonGroup>
                    <Button onClick={this.continueAnimation}>Play</Button>
                    <Button onClick={this.stop} className="btn-danger">Stop</Button>
                </ButtonGroup>  
                {history}
            </Col>
        </Row>
    </Container>
    )
  }
}

export default Lab4