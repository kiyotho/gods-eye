import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer({antialias : true})
renderer.setSize( window.innerWidth, window.innerHeight)
document.body.appendChild( renderer.domElement )


// const imageLoader = new THREE.ImageLoader() 
// imageLoader.load('../src/earthlights1k.jpg', (image) => {

// })


const geometry = new THREE.SphereGeometry(5, 32, 32)
const loader = new THREE.TextureLoader()
const texture = loader.load('./earthlights1k.jpg')
const material = new THREE.MeshPhongMaterial({ 
    map: texture,
    transparent: true, 
    opacity: 0.8,
    side: THREE.FrontSide

})


const sphere = new THREE.Mesh( geometry, material )
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
scene.add( sphere )

camera.position.z = 9

const glowGeometry = new THREE.SphereGeometry(5.15, 32, 32)
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

    sphere.rotation.y = time / 10000
}

renderer.setAnimationLoop( animate )

