import { Scene, PerspectiveCamera, WebGLRenderer, AnimationMixer, Clock, Color, Material, Group, Box3, Vector3, } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { messages, daynight, } from './store'
import TWEEN from '@tweenjs/tween.js'

const
  scene = new Scene()
  , camera = new PerspectiveCamera(10, document.body.clientWidth / document.body.clientHeight, .1, 2000)
  , loader = new GLTFLoader()
  , clock = new Clock()

let
  renderer: WebGLRenderer
  , controls: OrbitControls

export const d3models: {
  [_: string]: {
    materials: Material[]
    animations?: AnimationMixer
    model?: Group
  }
} = {}

camera.position.x = -3

// css colors

const
  docEl = getComputedStyle(document.documentElement)
  , colorLight = docEl.getPropertyValue('--light').trim()
  , colorDark = docEl.getPropertyValue('--dark').trim()
  , updateMaterialColor = (material: Material) => {

    const color = material.name === 'body'
      ? cssBgColor
      : material.name === 'outline'
        ? cssFgColor
        : ''

    if (!color) return



    (material as any).color.set(new Color((color)))
    return true
  },
  flipColors = (b: boolean) => {
    if ("dark" === localStorage.daynight || !("daynight" in localStorage) && b) {
      cssFgColor = colorLight
      cssBgColor = colorDark
    } else {
      cssFgColor = colorDark
      cssBgColor = colorLight
    }
  }, matchColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)")

let cssFgColor: string, cssBgColor: string

matchColorSchemeDark.addEventListener("change", (e => {
  flipColors(e.matches)

  for (const key in d3models) d3models[key]?.materials?.forEach(updateMaterialColor)
}))

daynight.subscribe(() => {
  flipColors(matchColorSchemeDark.matches)

  for (const key in d3models) d3models[key]?.materials?.forEach(updateMaterialColor)
})

// animate

const animate = () => {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  for (const key in d3models) d3models[key].animations?.update(delta)

  TWEEN.update()

  renderer.render(scene, camera)
}

// resize

const resize = () => {

  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight

  camera.updateProjectionMatrix()

}

// fit camera to object

function fitCameraToObject(object: Group, offset = 1.5) {

  const boundingBox = new Box3()

  boundingBox.setFromObject(object)

  const center = boundingBox.getCenter(new Vector3())
  const size = boundingBox.getSize(new Vector3())

  const startDistance = center.distanceTo(camera.position)

  const endDistance = camera.aspect > 1 ?
    ((size.y / 2) + offset) / Math.abs(Math.tan(camera.fov / 2)) :
    ((size.y / 2) + offset) / Math.abs(Math.tan(camera.fov / 2)) / camera.aspect

  camera.position.set(
    camera.position.x * endDistance / startDistance,
    camera.position.y * endDistance / startDistance,
    camera.position.z * endDistance / startDistance,
  )
  camera.lookAt(center)

  controls.target.copy(center)
}

// add

const add = (filename: string, cb: (model: Group) => void) => {

  d3models[filename] = { materials: [] }

  const urlFilename = './media/' + filename + '.glb'

  loader.load(
    urlFilename,
    gltf => {

      const model = gltf.scene

      model.traverse((obj) => {

        const node = obj as THREE.Mesh
        if (!node.isMesh) return

        const material = node.material as Material
        if (updateMaterialColor(material)) d3models[filename]?.materials?.push(material)

      })

      /* model.scale.set(0, 0, 0)
      scene.add(model)
      new TWEEN.Tween(model.scale).to({ x: 1, y: 1, z: 1 }, 100).easing(TWEEN.Easing.Quadratic.Out).start() */
      scene.add(model)
      d3models[filename].model = model
      cb(model)

      const mixer = new AnimationMixer(model)
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play())
      d3models[filename].animations = mixer

    },

    xhr => {
      // console.log((Math.round(xhr.loaded / xhr.total) * 100) + '%')
    },

    error => messages.set([filename + ': ' + JSON.stringify(error), 'e']),

  )

}

// remove

const remove = (filename: string) => {
  /* new TWEEN
    .Tween(d3models[filename].model.scale)
    .to({ x: 0, y: 0, z: 0 }, 100)
    .easing(TWEEN.Easing.Quadratic.In)
    .onComplete(() => {
      scene.remove(d3models[filename].model)
      delete d3models[filename]
    })
    .start() */
  scene.remove(d3models[filename].model)
  delete d3models[filename]
}


// export

export default class D3 {

  constructor(canvas: HTMLCanvasElement) {

    renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true })

    controls = new OrbitControls(camera, canvas)
    controls.update()

    resize()
    animate()

    window.addEventListener('resize', resize)

  }

  update(world: { [_: string]: { intoViewOffset?: number } } = {}) {

    for (const key in d3models) {
      if (!world[key]) remove(key)
    }

    for (const key in world) {

      if (!d3models[key]) {

        add(key, model => {
          if (world[key].intoViewOffset) fitCameraToObject(model, world[key].intoViewOffset)
        })

      } else {

        if (world[key].intoViewOffset) fitCameraToObject(d3models[key].model, world[key].intoViewOffset)

      }

    }
  }

}
