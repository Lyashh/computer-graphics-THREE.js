import React from 'react'
import * as THREE from 'three'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import {Container, Row, Col} from 'react-bootstrap'
import texture1 from '../img/Marble.png'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


class Lab9 extends React.Component {
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
            2000
        )
        //ZOOM
        this.camera.position.set(1,1,-7)
        this.camera.lookAt(new THREE.Vector3(0,0,0))

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('rgb(128, 128, 255)')
        this.renderer.setSize(width, height)
        this.renderer.physicallyCorrectLights = true
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        //this.controls.dampingFactor = 100; // friction
        this.controls.panSpeed = 10;
        this.controls.rotateSpeed = 0.5; // mouse sensitivity
        this.controls.target.set(4, -4, 25);

        this.mount.appendChild(this.renderer.domElement)
        this.scene.background = new THREE.Color("rgb(128, 128, 255)")

        //ADD FLOOR
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(80,40,10),
            new THREE.MeshPhongMaterial({color: 'rgb(255, 255, 255)', wireframe: this.state.wireframe, shininess: 150})
        )
        this.floor.position.set(-5, -3, 36)
        this.floor.rotation.x += Math.PI 
        this.rotateObject(this.floor, 0, 0, 0)
        this.floor.receiveShadow = true;
        this.floor.castShadow = true;
        this.scene.add(this.floor)

        //ADD FLOOR1
        this.floor1 = new THREE.Mesh(
            new THREE.PlaneGeometry(80,40,10),
            new THREE.MeshPhongMaterial({color: 'rgb(255, 255, 255)', wireframe: this.state.wireframe, shininess: 150})
        )
        this.floor1.position.set(-5, -10, 30)
        this.floor1.rotation.x += Math.PI 
        this.rotateObject(this.floor1, 60, 0, 0)
        this.floor1.receiveShadow = true;
        this.floor1.castShadow = true;
        this.scene.add(this.floor1)

         //ADD FLOOR2
        this.floor2 = new THREE.Mesh(
            new THREE.PlaneGeometry(80,40,10),
            new THREE.MeshPhongMaterial({color: 'rgb(255, 255, 255)', wireframe: this.state.wireframe, shininess: 150})
        )
        this.floor2.position.set(30, -3, 30)
        this.floor2.rotation.x += Math.PI 
        this.rotateObject(this.floor2, 0, -95, 10)
        this.floor2.receiveShadow = true;
        this.floor2.castShadow = true;
        this.scene.add(this.floor2)

        //ADD Ambient Light
        this.ambientLight = new THREE.AmbientLight('rgb(138, 0, 230)')
        this.scene.add(this.ambientLight);
 
        //ADD Point Light
        // 50 = Intensivity
        this.light = new THREE.PointLight( 'rgb(255, 204, 153)', 60, 300 )
        this.light.position.set( 5, -10, 15)
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 512;  // default
        this.light.shadow.mapSize.height = 512; // default
        this.light.shadow.camera.near = 0.5;       // default
        this.light.shadow.camera.far = 500      // default*/
        this.scene.add(this.light);

        //INIT TEXTURE
        this.textureLoader = new THREE.TextureLoader();
        const MarbleTexture = this.textureLoader.load(texture1);

        //OBJ 1
        this.obj1 = new THREE.Mesh(
            new THREE.PlaneGeometry(1,1,1),
            new THREE.MeshPhongMaterial({color: 'rgb(0, 145, 36)', wireframe: this.state.wireframe, shininess: 150})
        )
        this.obj1.position.set(-5, 8, 25)
        this.obj1.rotation.x += Math.PI 
        this.rotateObject(this.obj1, 0, 0, 0)
        this.obj1.receiveShadow = true;
        this.obj1.castShadow = true;
        this.scene.add(this.obj1)

        //ADD OBJ2
        const cubu2_x  = 10
        const cubu2_y  = -4
        const cubu2_z  = 30
        const geometry2 = new THREE.BoxGeometry(2, 2, 2)
        const material2 = new THREE.MeshPhongMaterial({ color: 'red', wireframe: this.state.wireframe, shininess: 150})
        this.cube2 = new THREE.Mesh(geometry2, material2)
        this.cube2.position.set(cubu2_x, cubu2_y, cubu2_z);
        this.rotateObject(this.cube2, 45, 0, 0)
        this.cube2.receiveShadow = true;
        this.cube2.castShadow = true;
        this.scene.add(this.cube2)

        //ADD OBJ3
        const cubu3_x  = -4
        const cubu3_y  = -4
        const cubu3_z  = 25
        const geometry3 = this.createBoxWithRoundedEdges(3, 3, 3, 0.7, 2)
        const material3 = new THREE.MeshPhongMaterial({ color: 'rgb(56, 168, 0)', wireframe: this.state.wireframe, shininess: 150})
        this.cube3 = new THREE.Mesh(geometry3, material3)
        this.cube3.position.set(cubu3_x, cubu3_y, cubu3_z);
        this.rotateObject(this.cube3, 30, 30, 0 )
        this.cube3.receiveShadow = true;
        this.cube3.castShadow = true;
        this.scene.add(this.cube3)

        //ADD OBJ4
        const cubu4_x  = -5
        const cubu4_y  = -8
        const cubu4_z  = 25
        const geometry4 = this.createBoxWithRoundedEdges(2, 3, 3, 0.7, 2)
        const material4 = new THREE.MeshPhongMaterial({ color: 'rgb(128,128,128)', wireframe: this.state.wireframe, shininess: 150})
        this.cube4 = new THREE.Mesh(geometry4, material4)
        this.cube4.position.set(cubu4_x, cubu4_y, cubu4_z);
        this.rotateObject(this.cube4, 45, 0, 0)
        this.cube4.receiveShadow = true;
        this.cube4.castShadow = true;
        this.scene.add(this.cube4)

        //OBJ 5
        this.obj5 = new THREE.Mesh(
            new THREE.PlaneGeometry(2,3,3),
            new THREE.MeshPhongMaterial({color: 'rgb(0, 87, 145)', wireframe: this.state.wireframe, shininess: 150})
        )
        this.obj5.rotation.x += Math.PI 
        this.rotateObject(this.obj5, 30, 30, 0)
        this.obj5.receiveShadow = true;
        this.obj5.castShadow = true;
        this.obj5.position.set(10, -4, 30);
        
        this.scene.add(this.obj5)

        //ADD OBJ6
        const cubu5_x  = 4
        const cubu5_y  = -4
        const cubu5_z  = 25
        const geometry5 = new THREE.BoxGeometry(3, 3, 3)
        const material5 = new THREE.MeshPhongMaterial({ 
            color: 'rgb(255,255,0)', 
            wireframe: this.state.wireframe,
            map: MarbleTexture,
            shininess: 150
        })
        this.cube5 = new THREE.Mesh(geometry5, material5)
        this.cube5.position.set(cubu5_x, cubu5_y, cubu5_z);
        this.rotateObject(this.cube5, 30, 30, 0)
        this.cube5.receiveShadow = true;
        this.cube5.castShadow = true;
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
        this.obj1.rotation.x += 0.012
        this.obj1.rotation.y += 0.015

        this.cube2.rotation.x += 0.023
        this.cube2.rotation.y += 0.018

        this.cube3.rotation.x += 0.011
        this.cube3.rotation.y += 0.021

    
        this.cube4.rotation.x += 0.015
        this.cube4.rotation.y += 0.027

        this.obj5.rotation.x += 0.016
        this.obj5.rotation.y += 0.012

        this.cube5.rotation.x += 0.011
        this.cube5.rotation.y += 0.024

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
                <p className="sceneTitle">Лабораторна робота № 9:   
                Освітлення об'єктів сцени точковим джерелом світла</p>
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

export default Lab9