  
import React from 'react'
import * as THREE from 'three'
import {Container, Row, Col} from 'react-bootstrap'


class Lab1 extends React.Component {

    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        //ZOOM
        this.camera.position.z = 4

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        //this.renderer.setClearColor('rgb(128, 128, 255)')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        //ADD CUBE
        this.start()
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        this.renderScene()
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }


 
  render() {
    return(
        <Container>
            <Row>
                <Col md={12}>
                    <div className="sceneContainer" ref={(mount) => { this.mount = mount }} />
                    <p className="sceneTitle">Лабораторна робота № 1:
                        Створення найпростішого екземляру сцени за допомогою Three.js</p>
                </Col>
            </Row>
        </Container>
    )
  }
}

export default Lab1