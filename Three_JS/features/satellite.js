const SatelliteData = document.querySelector('#satellite_data');
SatelliteData.addEventListener('click', () => { 

    window.location.href = './html_files/satellites.html';
});


// Get reference to the table body where satellite data will be displayed
const tableBody = document.querySelector("#satellite-data-table tbody");

// Function to update satellite data in the table
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
                satellites.push({
                    satrec,
                    name: tleLines[i].trim(),  // Use the first line (satellite name)
                    tleLine1: tleLine1.trim(),
                    tleLine2: tleLine2.trim()
                });

                const sprite = createSatelliteSprite('🛰️');
                scene.add(sprite);
                satelliteSprites.push(sprite);
                count++;
            }
        })
        .catch(error => console.error('Error loading satellite data:', error));
}

// Function to show satellite data in table
function showSatelliteData(satellite) {
    document.getElementById('satelliteName').innerText = satellite.name;
    document.getElementById('tleLine1').innerText = satellite.tleLine1;
    document.getElementById('tleLine2').innerText = satellite.tleLine2;
}

// Modify the click event to display satellite data
function onSatelliteClick(event) {
    raycaster.setFromCamera(clickMouse, camera);
    const intersects = raycaster.intersectObjects(satelliteSprites);

    if (intersects.length > 0) {
        const index = satelliteSprites.indexOf(intersects[0].object);
        if (index !== -1) {
            const clickedSatellite = satellites[index];
            // Zoom and follow the satellite (optional)
            zoomToSatellite(clickedSatellite);
            // Show satellite data in the table
            showSatelliteData(clickedSatellite);
        }
    }
}
