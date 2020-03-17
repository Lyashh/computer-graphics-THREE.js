import React from 'react'
import * as THREE from 'three';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {Container, Row, Col} from 'react-bootstrap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


class Lab5 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stepMove: 0.6,
            stepRotation: 0.05,
            wireframe: false
        }
    }

    async componentDidMount() {
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
        this.camera.position.set(1,1,-7)
        this.camera.lookAt(new THREE.Vector3(0,0,0))

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('rgb(128, 128, 255)')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        this.scene.background = new THREE.Color("rgb(128, 128, 255)");

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        //this.controls.dampingFactor = 100; // friction
        this.controls.panSpeed = 10;
        this.controls.rotateSpeed = 0.5; // mouse sensitivity
        this.controls.target.set(4, -4, 25);

        //OBJ 1
        this.obj1 = new THREE.Mesh(
            new THREE.PlaneGeometry(1,1,1),
            new THREE.MeshBasicMaterial({color: 'rgb(0, 145, 36)', wireframe: this.state.wireframe})
        )
        this.obj1.position.set(-5, 8, 25);
        this.obj1.rotation.x += Math.PI 
        this.rotateObject(this.obj1, 0, 0, 0)
        this.scene.add(this.obj1)

        //ADD OBJ2
        const cubu2_x  = 10
        const cubu2_y  = -4
        const cubu2_z  = 30
        const geometry2 = new THREE.BoxGeometry(2, 2, 2)
        const material2 = new THREE.MeshBasicMaterial({ color: 'red', wireframe: this.state.wireframe})
        this.cube2 = new THREE.Mesh(geometry2, material2)
        this.cube2.position.set(cubu2_x, cubu2_y, cubu2_z);
        this.rotateObject(this.cube2, 45, 0, 0)
        this.scene.add(this.cube2)

        //ADD OBJ3
        const cubu3_x  = -4
        const cubu3_y  = -4
        const cubu3_z  = 25
        const geometry3 = this.createBoxWithRoundedEdges(3, 3, 3, 0.7, 2)
        const material3 = new THREE.MeshBasicMaterial({ color: 'rgb(56, 168, 0)', wireframe: this.state.wireframe})
        this.cube3 = new THREE.Mesh(geometry3, material3)
        this.cube3.position.set(cubu3_x, cubu3_y, cubu3_z);
        this.rotateObject(this.cube3, 30, 30, 0 )
        this.scene.add(this.cube3)

        //ADD OBJ4
        const cubu4_x  = -5
        const cubu4_y  = -8
        const cubu4_z  = 25
        const geometry4 = this.createBoxWithRoundedEdges(2, 3, 3, 0.7, 2)
        const material4 = new THREE.MeshBasicMaterial({ color: 'rgb(128,128,128)', wireframe: this.state.wireframe})
        this.cube4 = new THREE.Mesh(geometry4, material4)
        this.cube4.position.set(cubu4_x, cubu4_y, cubu4_z);
        this.rotateObject(this.cube4, 45, 0, 0)
        this.scene.add(this.cube4)

        //OBJ 5
        this.obj5 = new THREE.Mesh(
            new THREE.PlaneGeometry(2,3,3),
            new THREE.MeshBasicMaterial({color: 'rgb(0, 87, 145)', wireframe: this.state.wireframe})
        )
        this.obj5.rotation.x += Math.PI 
        this.rotateObject(this.obj5, 30, 30, 0)
        this.obj5.position.set(10, -4, 30);
        
        this.scene.add(this.obj5)

        //ADD OBJ5
        const cubu5_x  = 4
        const cubu5_y  = -4
        const cubu5_z  = 25
        const geometry5 = new THREE.BoxGeometry(3, 3, 3)
        const material5 = new THREE.MeshBasicMaterial({ color: 'rgb(255,255,0)', wireframe: this.state.wireframe})
        this.cube5 = new THREE.Mesh(geometry5, material5)
        this.cube5.position.set(cubu5_x, cubu5_y, cubu5_z);
        this.rotateObject(this.cube5, 30, 30, 0)
        this.scene.add(this.cube5)

        this.controls.update();
        this.start()
    }

    createBoxWithRoundedEdges( width, height, depth, radius0, smoothness ) {
        let shape = new THREE.Shape();
        let eps = 0.00001;
        let radius = radius0 - eps;
        shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true );
        shape.absarc( eps, height -  radius * 2, eps, Math.PI, Math.PI / 2, true );
        shape.absarc( width - radius * 2, height -  radius * 2, eps, Math.PI / 2, 0, true );
        shape.absarc( width - radius * 2, eps, eps, 0, -Math.PI / 2, true );
        let geometry = new THREE.ExtrudeBufferGeometry( shape, {
          amount: depth - radius0 * 2,
          bevelEnabled: true,
          bevelSegments: smoothness * 2,
          steps: 1,
          bevelSize: radius,
          bevelThickness: radius0,
          curveSegments: smoothness
        });
        geometry.center();
        return geometry;
      }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    rotateObject(object, degreeX=0, degreeY=0, degreeZ=0) {
        object.rotateX(THREE.Math.degToRad(degreeX));
        object.rotateY(THREE.Math.degToRad(degreeY));
        object.rotateZ(THREE.Math.degToRad(degreeZ));
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
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    caseKey = (key) => {
        if(key==='w') {this.forward()}
        else if(key==='s') { this.back() }
        else if(key==='a') { this.left() }
        else if(key==='d') { this.right() }
        else if(key==='right') { this.rotationRight() }
        else if(key==='left') { this.rotationLeft() }
    }

    right = () => {
        this.camera.position.x +=  Math.sin(this.camera.rotation.y - Math.PI/2) * this.state.stepMove
        this.camera.position.z +=  -Math.cos(this.camera.rotation.y - Math.PI/2) * this.state.stepMove
    }

    left = () => {
        this.camera.position.x -=  Math.sin(this.camera.rotation.y - Math.PI/2) * this.state.stepMove
        this.camera.position.z -=  -Math.cos(this.camera.rotation.y - Math.PI/2) * this.state.stepMove
    }

    forward = () => {
        this.camera.position.x -=  Math.sin(this.camera.rotation.y) * this.state.stepMove
        this.camera.position.z -=  -Math.cos(this.camera.rotation.y) * this.state.stepMove
    }

    back = () => {
        this.camera.position.x +=  Math.sin(this.camera.rotation.y) * this.state.stepMove
        this.camera.position.z +=  -Math.cos(this.camera.rotation.y) * this.state.stepMove
    }


    rotationRight = () => {
        this.camera.rotation.y += Math.PI/2 * this.state.stepRotation
    }

    rotationLeft = () => {
        this.camera.rotation.y -= Math.PI/2 * this.state.stepRotation
    }

  render() {
    return(
        <Container>
        <Row>
            <Col md={12}>
            <div>
                <div className="sceneContainer" ref={(mount) => { this.mount = mount }} />
                <p className="sceneTitle">Лабораторна робота № 5:   
                Створення об'єктів сцени</p>
                <KeyboardEventHandler
                    handleKeys={['w', 's', 'a', 'd', 'left', 'right']}
                    onKeyEvent={(key, e) => this.caseKey(key)} />
            </div>
            </Col>
        </Row>
        </Container>
    )
  }
}

export default Lab5