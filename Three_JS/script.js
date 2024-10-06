import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as satellite from 'satellite.js';
import getStarfield from "./src/getStarfield.js";
import { getFreshnelMat } from "./src/getFreshnelMat.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// Handle WebGL context loss and restoration
renderer.domElement.addEventListener('webglcontextlost', function (event) {
  alert('WebGL context lost. You may need to reload the page.');
  event.preventDefault();
}, false);

renderer.domElement.addEventListener('webglcontextrestored', function (event) {
  console.log('WebGL context restored');
}, false);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

new OrbitControls(camera, renderer.domElement);
const detail = 12;
const loader = new THREE.TextureLoader();
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("./image/earthmap.jpg"),
  bumpMap: loader.load("./image/earthbump.png"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightMat = new THREE.MeshBasicMaterial({
    map:loader.load('/image/nightearth.jpg'),
    blending: THREE.AdditiveBlending,
});
const lightMesh = new THREE.Mesh(geometry, lightMat);
earthGroup.add(lightMesh);

const cloudMat = new THREE.MeshStandardMaterial({
  map: loader.load("./image/earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending : THREE.AdditiveBlending,
  alphaMap: loader.load('./image/cloudmaptrans.png'),
});
const cloudMesh = (new THREE.Mesh(geometry, cloudMat));
cloudMesh.setScale = 2;
earthGroup.add(cloudMesh);

const fresnelMat = getFreshnelMat({rimHex: 0x0088ff, facingHex: 0x000000});
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.setScale = 1.02;
earthGroup.add(glowMesh);

const directionalLight = new THREE.DirectionalLight('white', 2);
directionalLight.position.set(-2,1,1);
scene.add(directionalLight);

const stars = getStarfield({numStars: 3000});
scene.add(stars);

/* Till here we created Earth Model */

// now Satellite data and sprites
let satellites = [];
let satelliteSprites = [];
const maxSatellites = 3000;


// Variables to store mouse position
let mouseX = 0;
let mouseY = 0;

// Create a sprite (emoji or image) for satellites
function createSatelliteSprite(emoji) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    context.font = '10px serif';
    context.fillText(emoji, 10, 50);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.1, 0.1, 0.1);  // Small size for satellite
    // sprite.matrixAutoUpdate = true;   // Ensure the matrix is auto-updated

    return sprite;
}

// Load TLE data
function loadSatelliteData() {
    fetch('./space-track-leo.txt')
        .then(response => response.text())
        .then(data => {
            const tleLines = data.trim().split('\n');
            let count = 0;
            for (let i = 0; i < tleLines.length && count < maxSatellites; i += 3) {
                const tleLine1 = tleLines[i + 1];
                const tleLine2 = tleLines[i + 2];
                const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
                satellites.push({ satrec, tle: tleLines.slice(i, i + 3).join('\n') });

                const sprite = createSatelliteSprite('🛰️');
                scene.add(sprite);
                satelliteSprites.push(sprite);
                count++;
            }
        })
        .catch(error => console.error('Error loading satellite data:', error));
}

loadSatelliteData();

// Raycaster for detecting hover
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Tooltip div for showing satellite data
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'rgba(0,0,0,0.7)';
tooltip.style.color = 'white';
tooltip.style.padding = '8px';
tooltip.style.display = 'none';
tooltip.style.borderRadius = '4px';
tooltip.style.pointerEvents = 'none';
document.body.appendChild(tooltip);

// Update satellite positions based on time
function updateSatellitePositions() {
    const now = new Date();
    const gmst = satellite.gstime(now);
    satellites.forEach((sat, index) => {
        if (index >= maxSatellites) return;

        const positionAndVelocity = satellite.propagate(sat.satrec, now);
        const positionEci = positionAndVelocity.position;
        if (!positionEci) return;

        const positionGd = satellite.eciToGeodetic(positionEci, gmst);
        const longitude = satellite.degreesLong(positionGd.longitude);
        const latitude = satellite.degreesLat(positionGd.latitude);
        const altitude = positionGd.height;

        const radius = 1 + altitude / 6371;  // Radius based on altitude
        const x = radius * Math.cos(latitude) * Math.cos(longitude);
        const y = radius * Math.cos(latitude) * Math.sin(longitude);
        const z = radius * Math.sin(latitude);

        // Update satellite sprite position
        satelliteSprites[index].position.set(x, y, z);
    });
}

// Handle mouse movement for hover detection
function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Set mouse coordinates
    mouse.x = (mouseX / window.innerWidth) * 2 - 1;
    mouse.y = -(mouseY / window.innerHeight) * 2 + 1;

    // Call the function to check for satellite hover
    checkSatelliteHover();
}

function checkSatelliteHover() {
    raycaster.setFromCamera(mouse, camera); // Ensure camera is set

    // Intersect with sprite objects
    const intersects = raycaster.intersectObjects(satelliteSprites, true);

    if (intersects.length > 0) {
        const index = satelliteSprites.indexOf(intersects[0].object);
        if (index !== -1) {
            tooltip.style.display = 'block';
            tooltip.style.left = `${mouseX + 15}px`;
            tooltip.style.top = `${mouseY + 15}px`;

            // Get TLE data for the hovered satellite
            const tleLines = satellites[index].tle.split('\n');
            tooltip.innerHTML = tleLines[0].slice(1);

            // Update the satellite data table
            document.getElementById('satelliteName').textContent = tleLines[0].slice(1) || 'N/A';
            document.getElementById('tleLine1').textContent = tleLines[1].slice(1) || 'N/A';
            document.getElementById('tleLine2').textContent = tleLines[2].slice(1) || 'N/A';
        }
    } else {
        tooltip.style.display = 'none';
        document.getElementById('satelliteName').textContent = 'N/A';
        document.getElementById('tleLine1').textContent = 'N/A';
        document.getElementById('tleLine2').textContent = 'N/A';
    }
}

    
let targetSatellite = null;  // The satellite to zoom into and follow
let zooming = false;         // Track zoom state
let zoomStartTime = null;
const zoomDuration = 1000;   // Zoom time in milliseconds
let followDistance = 3;      // Maintain a constant distance from the satellite (can be adjusted by zooming)

// Variables for raycasting and mouse click tracking
const clickMouse = new THREE.Vector2();  // Vector for tracking click position
const raycasterClick = new THREE.Raycaster();  // Raycaster for detecting clicked satellite

// Function to smoothly zoom to a satellite
function zoomToSatellite(satelliteSprite) {
    zooming = true;
    zoomStartTime = Date.now();

    const initialPosition = camera.position.clone();
    const targetPosition = satelliteSprite.position.clone().multiplyScalar(followDistance); // Zoom distance

    const zoom = () => {
        const elapsedTime = Date.now() - zoomStartTime;
        const t = Math.min(elapsedTime / zoomDuration, 1);

        camera.position.lerpVectors(initialPosition, targetPosition, t);
        camera.lookAt(satelliteSprite.position);

        if (t < 1) {
            requestAnimationFrame(zoom);
        } else {
            zooming = false;
            targetSatellite = satelliteSprite;  // Start following the satellite after zoom
        }
    };
    zoom();
}

// Define variables for the path
let satellitePath = null;

// Function to load satellite path for the clicked satellite
function loadSatellitePathForClickedSatellite(satrec, maxPoints = 100) {
    if (satellitePath) {
        scene.remove(satellitePath);
    }

    const points = [];
    const gmst = satellite.gstime(new Date());
    const totalDuration = 5400;  
    const timeStep = totalDuration / maxPoints;

    for (let t = 0; t < maxPoints; t++) {
        const timeOffset = t * timeStep; 
        const date = new Date(Date.now() + timeOffset * 1000);
        const positionAndVelocity = satellite.propagate(satrec, date);
        const positionEci = positionAndVelocity.position;

        if (positionEci) {
            const positionGd = satellite.eciToGeodetic(positionEci, gmst);
            const longitude = satellite.degreesLong(positionGd.longitude) * (Math.PI / 180);
            const latitude = satellite.degreesLat(positionGd.latitude) * (Math.PI / 180);
            const altitude = positionGd.height;

            const radius = 1 + altitude / 6371; 
            const x = radius * Math.cos(latitude) * Math.cos(longitude);
            const y = radius * Math.cos(latitude) * Math.sin(longitude);
            const z = radius * Math.sin(latitude);

            points.push(new THREE.Vector3(x, y, z));
        }
    }

    // Smooth path by adding more interpolated points if needed
    if (points.length > 1) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        satellitePath = new THREE.Line(geometry, material);
        scene.add(satellitePath);
    }



    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    satellitePath = new THREE.Line(geometry, material);
    scene.add(satellitePath);
}

// Modified onSatelliteClick function to show the path of the clicked satellite
function onSatelliteClick(event) {
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycasterClick.setFromCamera(clickMouse, camera);
    const intersects = raycasterClick.intersectObjects(satelliteSprites);

    if (intersects.length > 0) {
        const clickedSatellite = intersects[0].object;
        const index = satelliteSprites.indexOf(clickedSatellite);
        if (index !== -1) {
            const satrec = satellites[index].satrec;
            zoomToSatellite(clickedSatellite);  // Zoom into the clicked satellite

            // Load and display the satellite's path
            loadSatellitePathForClickedSatellite(satrec);
        }
    }
}

function updateTooltipPosition(event) {
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.clientX + 15}px`;
    tooltip.style.top = `${event.clientY + 15}px`;
}

// Hide tooltip when the mouse moves away
document.addEventListener('mousemove', (event) => {
    if (!raycasterClick.intersectObjects(satelliteSprites).length) {
        tooltip.style.display = 'none';
        isTooltipVisible = false;
    }
});

// Hide tooltip when the mouse leaves the satellite area
document.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
    isTooltipVisible = false;
});

// Define a minimum follow distance (adjust this based on your scene's scale)
const stopFollowDistance = 3;  // Stop following if the distance between camera and satellite exceeds this value

function followSatellite() {
    if (targetSatellite && !zooming) {
        const followPosition = targetSatellite.position.clone().multiplyScalar(followDistance); // Keep a distance

        // Calculate the distance between the camera and the satellite
        const distanceToSatellite = camera.position.distanceTo(targetSatellite.position);

        // Only follow if the camera is within the allowed distance
        if (distanceToSatellite <= stopFollowDistance) {
            // Smoothly follow the satellite
            camera.position.lerp(followPosition, 0.05);  // Lerp factor controls the smoothness
            camera.lookAt(targetSatellite.position);     // Always look at the satellite
        } else {
            // Stop following: You can add logic here if you want to handle stopping in a specific way
            targetSatellite = null;  // Stop following by resetting the target
        }
    }
}


// Add event listener for zooming with the mouse wheel
window.addEventListener('wheel', function(event) {
    // Adjust the follow distance based on the scroll direction
    if (event.deltaY < 0) {
        followDistance = Math.max(1, followDistance - 0.5);  // Zoom in (min distance is 1)
    } else {
        followDistance += 0.5;  // Zoom out
    }
});

function loadSatellitePaths(scene, maxPoints = 54) { 
    fetch('./space-track-leo.txt')
        .then(response => response.text())
        .then(data => {
            const tleLines = data.trim().split('\n');
            for (let i = 0; i < (tleLines.length)/3; i += 3) {
                const tleLine1 = tleLines[i + 1];
                const tleLine2 = tleLines[i + 2];
                const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

                const points = [];
                const gmst = satellite.gstime(new Date());
                const totalDuration = 5400;  
                const timeStep = totalDuration / maxPoints; 

                for (let t = 0; t < maxPoints; t++) {
                    const timeOffset = t * timeStep; 
                    const date = new Date(Date.now() + timeOffset * 1000);
                    const positionAndVelocity = satellite.propagate(satrec, date);
                    const positionEci = positionAndVelocity.position;

                    if (positionEci) {
                        const positionGd = satellite.eciToGeodetic(positionEci, gmst);
                        const longitude = satellite.degreesLong(positionGd.longitude) * (Math.PI / 180); 
                        const latitude = satellite.degreesLat(positionGd.latitude) * (Math.PI / 180); 
                        const altitude = positionGd.height;

                        const radius = 1 + altitude / 6371; 
                        const x = radius * Math.cos(latitude) * Math.cos(longitude);
                        const y = radius * Math.cos(latitude) * Math.sin(longitude);
                        const z = radius * Math.sin(latitude);

                        points.push(new THREE.Vector3(x, y, z));
                    }
                }

                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
                const line = new THREE.Line(geometry, material);
                scene.add(line);
            }
        })
        .catch(error => console.error('Error loading satellite paths:', error));
}


// Event listener for the button click
const button = document.getElementById('path');
button.addEventListener('click', () => loadSatellitePaths(scene, 54)); // Pass the scene and maxPoints when calling the function

let isTooltipVisible = false; // Initialize tooltip visibility state

let asteroid =[];
let asteroidSprites=[];
// Create a function to generate asteroid sprite
function createAsteroidSprite(emoji) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    context.font = '50px serif';
    context.fillText(emoji, 10, 50);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(1, 1, 1);  // Adjust the size for asteroid

    return sprite;
}

// Add a new function to load the asteroid data
function loadAsteroidData() {
    fetch('./Recent_close _approach_asteroid_near_earth.json')
        .then(response => response.json())
        .then(asteroidData => {
            console.log(asteroidData)
            const { 
                "Object designation": objectDesignation,
                "Miss distance in km": missDistanceKm,
                "Diameter in m": diameter,
                "Relative\nvelocity in km/s": relativeVelocity
            } = asteroidData;

            // Create a new sprite or mesh for the asteroid
            const asteroidSprite = createAsteroidSprite(' 😂 '); // Create a sprite (can be an emoji or image)
            
            // Position asteroid based on miss distance
            const distanceFromEarth = missDistanceKm / 6371; // Convert miss distance to Earth radii
            function calculateAsteroidPosition(missDistanceKm, theta = 0, phi = Math.PI / 4) {
                const r = missDistanceKm; // Use the miss distance as radius
                const x = r * Math.cos(theta) * Math.sin(phi);
                const y = r * Math.sin(theta) * Math.sin(phi);
                const z = r * Math.cos(phi);
                return { x, y, z };
            }
            calculateAsteroidPosition(missDistanceKm,0,Math.PI/4)
                    // Set asteroid's position
        asteroidSprite.position.set(x, y, z);

        // Add asteroid to the scene and store in arrays for future interaction
        scene.add(asteroidSprite);
        
        asteroid.push({ objectDesignation, diameter, relativeVelocity });
        asteroidSprites.push(asteroidSprite);
        asteroidSprite.scale.set(0.5, 0.5, 0.5);  // Adjust this scale for better visibility

    })
    .catch(error => console.error('Error loading asteroid data:', error));

}
loadAsteroidData()


// Modify the hover check function to handle asteroids as well
function checkAsteroidHover() {
    raycaster.setFromCamera(mouse, camera);
    
    // Check if the mouse is hovering over any asteroid
    const intersects = raycaster.intersectObjects(asteroidSprites, true);

    if (intersects.length > 0) {
        const asteroid = intersects[0].object.userData;

        tooltip.style.display = 'block';
        tooltip.style.left = `${mouseX + 15}px`;
        tooltip.style.top = `${mouseY + 15}px`;

        // Display asteroid data in the tooltip
        tooltip.innerHTML = `
            <strong>Asteroid:</strong> ${asteroid.designation} <br />
            <strong>Diameter:</strong> ${asteroid.diameter} m<br />
            <strong>Velocity:</strong> ${asteroid.velocity} km/s
        `;
    } else {
        tooltip.style.display = 'none';
    }
}


loadAsteroidData();  // Call this once during the initial setup

function animate() {
    requestAnimationFrame(animate);

    earthMesh.rotation.y -= 0.002;
    lightMesh.rotation.y -= 0.002;
    cloudMesh.rotation.y -= 0.002;
    glowMesh.rotation.y -= 0.002;
    stars.rotation.y -= 0.0002;

    updateSatellitePositions();
    checkSatelliteHover();
    checkAsteroidHover();  // Check for asteroid hover interactions
    followSatellite();
    renderer.render(scene, camera);
}



window.addEventListener('click', onSatelliteClick);
window.addEventListener('mousemove', onMouseMove);
animate();

function handleWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
