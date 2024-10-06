
// now Satellite data and sprites
let asteroid = [];
let asteroidSprites = [];
const maxasteroid = 30;


// Variables to store mouse position
let mouseX = 0;
let mouseY = 0;

// Create a sprite (emoji or image) for satellites
function createAsteroidSprite(emoji) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    context.font = '10px serif';
    context.fillText(emoji, 10, 50);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.9, 0.9, 0.9);  // Small size for satellite
    // sprite.matrixAutoUpdate = true;   // Ensure the matrix is auto-updated

    return sprite;
}

// Load TLE data
function loadAsteroidData() {
    fetch('./Recent_close _approach_asteroid_near_earth.json')
        .then(response => response.json())
        .then(data => {
            
            asteroid = data;
        })
        .catch(error => console.error('Error loading satellite data:', error));
}

loadAsteroidData();


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
function updateAsteroidPositions() {
    const now = new Date();
    const gmst = asteroid.gstime(now);
    asteroid.forEach((sat, index) => {
        if (index >= maxasteroid) return;

        const positionAndVelocity = asteroid.propagate(sat.satrec, now);
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



