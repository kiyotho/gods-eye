import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight)
document.body.appendChild( renderer.domElement )


const geometry = new THREE.SphereGeometry(5, 32, 32)
const loader = new THREE.TextureLoader()
const texture = loader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/WorldMap-A_non-Frame.png/1280px-WorldMap-A_non-Frame.png')
const material = new THREE.MeshPhongMaterial({ map: texture })


const sphere = new THREE.Mesh( geometry, material )
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
scene.add( sphere )

camera.position.z = 13

const glowGeometry = new THREE.SphereGeometry(5.3, 32, 32)
const glowMaterial = new THREE.MeshPhongMaterial({

    color: 0x0088ff,
    transparent: true,
    opacity: 0.35,
    side: THREE.BackSide

})

const glow = new THREE.Mesh(glowGeometry, glowMaterial)

scene.add(glow)

function animate(time) {
    renderer.render(scene, camera)

    sphere.rotation.y = time / 1000
}

renderer.setAnimationLoop( animate )

