  
import React from 'react'
import * as THREE from 'three';
import {Container, Row, Col} from 'react-bootstrap'


class Lab4 extends React.Component {
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
        this.camera.position.z = 4

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        this.renderer.setClearColor('rgb(128, 128, 255)')

        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 'rgb(136, 176, 75)', transparent: true, opacity: 0.2})
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)

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

    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        this.line.rotation.x += 0.01
        this.line.rotation.y += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
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
                    <p className="sceneTitle">Лабораторна робота № 4:   
                    Візуалізація каркасної моделі куба за допомогою мікропрограми</p>
                </Col>
            </Row>
        </Container>
    )
  }
}

export default Lab4