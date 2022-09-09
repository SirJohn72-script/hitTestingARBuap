import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { ARButton } from 'three/examples/jsm/webxr/ARButton'
import { ARButton } from './ARButton'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class ARExperience {
  constructor() {
    //create the element
    this.container = document.createElement('div')

    //camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    this.camera.position.set(0, 0, 3.5)

    this.scene = new THREE.Scene()

    //renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setPixelRatio(1)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.5
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.renderer.domElement)
    this.renderer.setAnimationLoop(this.render.bind(this))

    //   controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    // this.controls.target.set(0, 0, -0.3)

    //resize
    window.addEventListener('resize', this.resize.bind(this))

    //Reticle vector 3
    this.SpaceWorkVec3 = new THREE.Vector3()
    this.setupARExperience()

    //
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshBasicMaterial(0xff00ff)
    )
    this.mesh.visible = false
    this.scene.add(this.mesh)

    //   Add reticle
    this.reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI * 0.5),
      new THREE.MeshBasicMaterial()
    )

    this.reticle.matrixAutoUpdate = false
    this.reticle.visible = false
    this.scene.add(this.reticle)

    this.model = new THREE.Group()
    this.model.visible = false
  }

  initScene() {
    document.getElementById('Scene3D').appendChild(this.container)
    this.loadModel()
    this.addLight()
  }

  loadModel() {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./models/CartelModel.glb', (gltf) => {
      this.model.add(gltf.scene)
      this.scene.add(this.model)
      //   this.model.position.set(5, 5, 5)
    })
  }

  addLight() {
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1)
    this.scene.add(hemisphereLight)
  }

  setupARExperience() {
    this.renderer.xr.enabled = true

    new ARButton(this.renderer, {
      sessionInit: {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: this.container },
      },
    })

    this.hitTestSourceRequested = false //target
    this.hitTestSource = null //origin

    const onSelect = () => {
      if (this.reticle.visible) {
        this.model.visible = true
        this.model.position.setFromMatrixPosition(this.reticle.matrix)
        this.model.quaternion.setFromRotationMatrix(this.reticle.matrix)
      }
    }

    // this controller
    this.controller = this.renderer.xr.getController(0)
    this.scene.add(this.controller)
    this.controller.addEventListener('select', () => {
      onSelect()
    })
  }

  //Origin
  requestHitTestSource() {
    const session = this.renderer.xr.getSession()

    session.requestReferenceSpace('viewer').then((referenceSpace) => {
      session.requestHitTestSource({ space: referenceSpace }).then((source) => {
        this.hitTestSource = source
      })
    })

    session.addEventListener('start', () => {
      console.log('Inicio se ssion')
    })

    session.addEventListener('end', () => {
      this.hitTestSourceRequested = false
      this.hitTestSource = null
      this.referenceSpace = null
    })

    this.hitTestSourceRequested = true
  }

  //Target
  getHitTestResults(frame) {
    const hitTestResults = frame.getHitTestResults(this.hitTestSource)

    if (hitTestResults.length) {
      const referenceSpace = this.renderer.xr.getReferenceSpace()
      const hit = hitTestResults[0]
      const pose = hit.getPose(referenceSpace)

      this.reticle.visible = true
      this.reticle.matrix.fromArray(pose.transform.matrix)
    } else {
      this.reticle.visible = false
    }
  }

  resize() {
    const { clientWidth: width, clientHeight: height } =
      document.querySelector('.container3D')
    this.renderer.setSize(width, height)
    this.camera.updateProjectionMatrix()
    this.camera.aspect = width / height
  }

  render(timestamp, frame) {
    this.controls.update()

    if (frame) {
      if (this.hitTestSourceRequested === false) {
        this.requestHitTestSource()
      }

      if (this.hitTestSource) {
        this.getHitTestResults(frame)
      }
    }
    this.renderer.render(this.scene, this.camera)
  }

  cleapUp() {}
}

export { ARExperience }
