  
import React from 'react'
import * as THREE from 'three';
import {Container, Row, Col} from 'react-bootstrap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Rgz3 extends React.Component {

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
        this.camera.position.z = 110
        this.camera.position.y = -40
        this.camera.lookAt(new THREE.Vector3(0,0,0))

        
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('rgb(128, 128, 255)')
        this.scene.background = new THREE.Color("rgb(128, 128, 255)");
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        //this.controls.dampingFactor = 100; // friction
        this.controls.panSpeed = 10;
        this.controls.rotateSpeed = 0.5; // mouse sensitivity
        this.controls.target.set(50, 20, 0);

        const geometry = new THREE.Geometry();
        geometry.vertices.push(
          new THREE.Vector3(25.1, 20.1,  0),  // 0
          new THREE.Vector3( -34.86, 20.1,  0),  // 1
          new THREE.Vector3(25.1, 20.1,  30),  // 2
          new THREE.Vector3( -34.86, 20.1,  30),  // 3
          new THREE.Vector3(25.1  , -24.89,  0),  // 4
          new THREE.Vector3( -34.86, -24.89, 0),  // 5
          new THREE.Vector3(25.1,  -24.89, 60),  // 6
          new THREE.Vector3( -34.86,  -24.89, 60),  // 7
          new THREE.Vector3(25.1,  0.10, 60),  // 8
          new THREE.Vector3( -34.86,  0.10, 60),  // 9
          new THREE.Vector3(25.1,  0.10, 30),  // 10
          new THREE.Vector3( -34.86,  0.10, 30),  // 11
          new THREE.Vector3(25.1,  -24.89, 30),  // 12
          new THREE.Vector3( -34.86,  -24.89, 30),  // 13
        );

        geometry.faces.push(
          // front
          new THREE.Face3(0, 3, 2),
          new THREE.Face3(0, 1, 3),
          // right bottom 
          new THREE.Face3(12, 4, 0),
          new THREE.Face3(12, 0, 2),
          // right top 
          new THREE.Face3(10, 8, 12),
          new THREE.Face3(12, 8, 6),
          // left bottom 
          new THREE.Face3(13, 1, 5),
          new THREE.Face3(13, 3, 1),
          // left top 
          new THREE.Face3(7, 9, 13),
          new THREE.Face3(9, 11, 13),
          // top 
          new THREE.Face3(7, 6, 9),
          new THREE.Face3(6, 8, 9),
          // inside front 
          new THREE.Face3(8, 10, 9),
          new THREE.Face3(10, 11, 9),
          // inside top 
          new THREE.Face3(10, 2, 11),
          new THREE.Face3(11, 2, 3),
          // bottom 
          new THREE.Face3(4, 5, 0),
          new THREE.Face3(1, 0, 5),
           // back 
           new THREE.Face3(4, 6, 7),
           new THREE.Face3(5, 4, 7),
        );

        const material = new THREE.MeshBasicMaterial({color: 'white', wireframe: true})
        this.cube = new THREE.Mesh(geometry, material)
        this.cube.position.set(0, 0, 0)
        this.rotateObject(this.cube, 150, 180, 40)
        this.scene.add(this.cube)

        const fullMaterial = new THREE.MeshBasicMaterial({color: 'rgb(175, 234, 220)'})
        this.mesh = new THREE.Mesh( geometry, fullMaterial );
        this.mesh.position.set( 70, 50, -30 );
        this.rotateObject( this.mesh, 150, 180, 40)
        this.scene.add(this.mesh)

        const edges = new THREE.EdgesGeometry( geometry );
        this.line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'rgb(4, 30, 66)' } ) );
        this.line.position.set( 70, 50, -30 );
        this.rotateObject(this.line, 150, 180, 40)
        this.scene.add(this.line)

        this.controls.update();
        this.start()
    }

    rotateObject(object, degreeX=0, degreeY=0, degreeZ=0) {
      object.rotateX(THREE.Math.degToRad(degreeX));
      object.rotateY(THREE.Math.degToRad(degreeY));
      object.rotateZ(THREE.Math.degToRad(degreeZ));
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
        //this.cube.rotation.x += 0.01
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
                </Col>
            </Row>
        </Container>
    )
  }
}

export default Rgz3