import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )





const renderer = new THREE.WebGLRenderer({antialias : true})
renderer.setSize( window.innerWidth, window.innerHeight)
document.body.appendChild( renderer.domElement )

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(0, 5, 10)
controls.update()


const geometry = new THREE.SphereGeometry(5, 32, 32)
const loader = new THREE.TextureLoader()
const texture = loader.load('./earthlights1k.jpg')
const material = new THREE.MeshPhongMaterial({ 
    map: texture,
    transparent: true, 
    opacity: 1,
    side: THREE.FrontSide

})


const sphere = new THREE.Mesh( geometry, material )
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
scene.add( sphere )


const wireFrame = new THREE.WireframeGeometry( geometry )
const wireMaterial = new THREE.LineBasicMaterial({ 
    color: 0x0088ff, 
    transparent: true, 
    opacity: 0.1 
})
const wire = new THREE.LineSegments(wireFrame, wireMaterial)
scene.add(wire)



camera.position.z = 9

const glowGeometry = new THREE.SphereGeometry(5.15, 32, 32)
const glowMaterial = new THREE.MeshPhongMaterial({

    color: 0x0088ff,
    transparent: true,
    opacity: 0.35,
    side: THREE.BackSide

})

const starGeometry = new THREE.BufferGeometry()
const starCount = 10000
const positions = new Float32Array(starCount * 3)

for(let i = 0; i < starCount * 3; i++){
    positions[i] = (Math.random() - 0.5) * 2000
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })
const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)



function latLngToVector3(lat, lng, radius){
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    )
}



const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Meerut', lat: 28.9845, lng: 77.7064 },
]

cities.forEach(city => {
    const pos = latLngToVector3(city.lat, city.lng, 5.05)
    const dotGeometry = new THREE.SphereGeometry(0.025, 8, 15)
    const dotMaterial = new THREE.MeshBasicMaterial({ color: '9A813C' })
    const dot = new THREE.Mesh(dotGeometry, dotMaterial)
    dot.position.copy(pos)
    sphere.add(dot)
})


const glow = new THREE.Mesh(glowGeometry, glowMaterial)

scene.add(glow)

function animate(time) {

    controls.update()
    renderer.render(scene, camera)
    sphere.rotation.y = time / 10000
    stars.position.copy(camera.position)

}

renderer.setAnimationLoop( animate )

