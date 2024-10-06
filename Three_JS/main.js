// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import getStarfield from './src/getStarfield.js';
// import * as satellite from 'satellite.js';

// // Initialize renderer, scene, and camera
// const w = window.innerWidth;
// const h = window.innerHeight;
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(w, h);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));  // Optimized for performance
// document.body.appendChild(renderer.domElement);

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
// camera.position.z = 5;

// const earthGroup = new THREE.Group();
// earthGroup.rotation.z = -23.4 * Math.PI / 180;  // Tilt Earth’s axis
// scene.add(earthGroup);

// // Orbit controls with smooth damping
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.1;
// controls.minDistance = 1.5;
// controls.maxDistance = 10;

// // Load Earth texture
// const loader = new THREE.TextureLoader();
// const geometry = new THREE.IcosahedronGeometry(1.0, 20);
// const material = new THREE.MeshStandardMaterial({
//     map: loader.load('./image/earthmap.jpg'),
// });
// const earthMesh = new THREE.Mesh(geometry, material);
// earthGroup.add(earthMesh);

// // Starfield background
// const stars = getStarfield({ numStars: 3000 });
// scene.add(stars);

// // Lighting
// const hemiLight = new THREE.HemisphereLight('', '', 2);
// scene.add(hemiLight);

// // Satellite data and sprites
// let satellites = [];
// let satelliteSprites = [];
// const maxSatellites = 100;

// // Variables to store mouse position
// let mouseX = 0;
// let mouseY = 0;

// // Create a sprite (emoji or image) for satellites
// function createSatelliteSprite(emoji) {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     canvas.width = 64;
//     canvas.height = 64;
//     context.font = '40px serif';
//     context.fillText(emoji, 10, 50);

//     const texture = new THREE.CanvasTexture(canvas);
//     const material = new THREE.SpriteMaterial({ map: texture });
//     const sprite = new THREE.Sprite(material);
//     sprite.scale.set(0.1, 0.1, 0.1);  // Small size for satellite

//     return sprite;
// }

// // Load TLE data
// function loadSatelliteData() {
//     fetch('./space-track-leo.txt')
//         .then(response => response.text())
//         .then(data => {
//             const tleLines = data.trim().split('\n');
//             let count = 0;
//             for (let i = 0; i < tleLines.length && count < maxSatellites; i += 3) {
//                 const tleLine1 = tleLines[i + 1];
//                 const tleLine2 = tleLines[i + 2];
//                 const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
//                 satellites.push({ satrec, tle: tleLines.slice(i, i + 3).join('\n') });

//                 const sprite = createSatelliteSprite('🛰️');
//                 scene.add(sprite);
//                 satelliteSprites.push(sprite);
//                 count++;
//             }
//         })
//         .catch(error => console.error('Error loading satellite data:', error));
// }

// loadSatelliteData();

// // Raycaster for detecting hover
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// // Tooltip div for showing satellite data
// const tooltip = document.createElement('div');
// tooltip.style.position = 'absolute';
// tooltip.style.backgroundColor = 'rgba(0,0,0,0.7)';
// tooltip.style.color = 'white';
// tooltip.style.padding = '8px';
// tooltip.style.display = 'none';
// tooltip.style.borderRadius = '4px';
// tooltip.style.pointerEvents = 'none';
// document.body.appendChild(tooltip);

// // Update satellite positions based on time
// function updateSatellitePositions() {
//     const now = new Date();
//     const gmst = satellite.gstime(now);

//     satellites.forEach((sat, index) => {
//         if (index >= maxSatellites) return;

//         const positionAndVelocity = satellite.propagate(sat.satrec, now);
//         const positionEci = positionAndVelocity.position;
//         if (!positionEci) return;

//         const positionGd = satellite.eciToGeodetic(positionEci, gmst);
//         const longitude = satellite.degreesLong(positionGd.longitude);
//         const latitude = satellite.degreesLat(positionGd.latitude);
//         const altitude = positionGd.height;

//         const radius = 1 + altitude / 6371;  // Radius based on altitude
//         const x = radius * Math.cos(latitude) * Math.cos(longitude);
//         const y = radius * Math.cos(latitude) * Math.sin(longitude);
//         const z = radius * Math.sin(latitude);

//         // Update satellite sprite position
//         satelliteSprites[index].position.set(x, y, z);
//     });
// }

// // Handle mouse movement for hover detection
// function onMouseMove(event) {
//     mouseX = event.clientX;
//     mouseY = event.clientY;

//     mouse.x = (mouseX / window.innerWidth) * 2 - 1;
//     mouse.y = -(mouseY / window.innerHeight) * 2 + 1;
// }

// function checkSatelliteHover() {
//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(satelliteSprites);

//     if (intersects.length > 0) {
//         const index = satelliteSprites.indexOf(intersects[0].object);
//         if (index !== -1) {
//             tooltip.style.display = 'block';
//             tooltip.style.left = `${mouseX + 15}px`;
//             tooltip.style.top = `${mouseY + 15}px`;
            
//             // Display only the first line of TLE data
//             const tleFirstLine = satellites[index].tle.split('\n')[0];
//             tooltip.innerHTML = tleFirstLine;
//         }
//     } else {
//         tooltip.style.display = 'none';
//     }
// }


// // Fetch Meteor Data
// let meteorsData = [];

// function fetchMeteorData() {
//     fetch('./meteors.json')
//         .then(response => response.json())
//         .then(data => {
//             meteorsData = data;
//             addMeteors();
//         })
//         .catch(error => console.error('Error loading meteor data:', error));
// }

// fetchMeteorData();

// // Create and display meteors based on the fetched data
// let meteors = [];

// function createMeteor(data) {
//     const meteorGeometry = new THREE.SphereGeometry(0.05, 16, 16);
//     const meteorMaterial = new THREE.MeshBasicMaterial({ color: 'red' });

//     const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
//     const inclination = THREE.MathUtils.degToRad(data.i_deg);
//     const distance = parseFloat(data.q_au_1) * 5;  // Scaled distance

//     meteor.position.set(
//         distance * Math.cos(inclination),
//         distance * Math.sin(inclination),
//         THREE.MathUtils.randFloatSpread(1)
//     );

//     scene.add(meteor);

//     // Create direction for the meteor (random)
//     const direction = new THREE.Vector3(
//         THREE.MathUtils.randFloatSpread(1),
//         THREE.MathUtils.randFloatSpread(1),
//         THREE.MathUtils.randFloatSpread(1)
//     ).normalize();

//     // Create a trail for the meteor
//     const trailGeometry = new THREE.BufferGeometry();
//     const trailMaterial = new THREE.LineBasicMaterial({ color: 'red' });
//     const trail = new THREE.Line(trailGeometry, trailMaterial);
//     scene.add(trail);

//     return { meteor, direction, trail, trailVertices: [] };
// }

// // Add meteors based on data
// function addMeteors() {
//     meteorsData.forEach(meteorData => {
//         const meteorObj = createMeteor(meteorData);
//         meteors.push(meteorObj);
//     });
// }

// // Update meteors' positions and trails
// function updateMeteors() {
//     meteors.forEach(meteorObj => {
//         const { meteor, direction, trail, trailVertices } = meteorObj;

//         // Move the meteor forward
//         meteor.position.add(direction.multiplyScalar(0.02));  // Speed of the meteor

//         // Update the trail with the current position
//         trailVertices.push(meteor.position.clone());
//         if (trailVertices.length > 20) {  // Limit trail length
//             trailVertices.shift();
//         }

//         const positions = new Float32Array(trailVertices.length * 3);
//         for (let i = 0; i < trailVertices.length; i++) {
//             positions[i * 3] = trailVertices[i].x;
//             positions[i * 3 + 1] = trailVertices[i].y;
//             positions[i * 3 + 2] = trailVertices[i].z;
//         }

//         trail.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//         trail.geometry.attributes.position.needsUpdate = true;

//         // Reset meteor position if it moves too far away
//         if (meteor.position.length() > 50) {
//             meteor.position.set(
//                 THREE.MathUtils.randFloatSpread(100),
//                 THREE.MathUtils.randFloatSpread(100),
//                 THREE.MathUtils.randFloatSpread(100)
//             );
//             trailVertices.length = 0;  // Clear the trail
//         }
//     });
// }

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);

//     updateSatellitePositions();  // Update satellite positions
//     checkSatelliteHover();  // Check for satellite hover interactions

//     earthMesh.rotateY(0.001);  // Rotate the Earth
//     // stars.rotation.y -= 0.0002;  // Rotate stars background slowly
//     renderer.render(scene, camera);  // Render the scene

//     controls.update();  // Update controls for smooth damping
// }

// // Event listeners
// window.addEventListener('mousemove', onMouseMove);
// animate();
