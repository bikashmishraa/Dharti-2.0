

// export function loadSatellitePaths(scene) {
//     fetch('../space-track-leo.txt')
//         .then(response => response.text())
//         .then(data => {
//             const tleLines = data.trim().split('\n');
//             for (let i = 0; i < tleLines.length; i += 3) {
//                 const tleLine1 = tleLines[i + 1];
//                 const tleLine2 = tleLines[i + 2];
//                 const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

//                 // Create orbit line
//                 const points = [];
//                 const gmst = satellite.gstime(new Date());

//                 // Create a path of satellite positions for the orbit
//                 for (let t = 0; t < 5400; t += 100) {  // Over 90 minutes, step size 100 seconds
//                     const date = new Date(Date.now() + t * 1000);
//                     const positionAndVelocity = satellite.propagate(satrec, date);
//                     const positionEci = positionAndVelocity.position;

//                     if (positionEci) {
//                         const positionGd = satellite.eciToGeodetic(positionEci, gmst);
//                         const longitude = satellite.degreesLong(positionGd.longitude) * (Math.PI / 180); // Convert to radians
//                         const latitude = satellite.degreesLat(positionGd.latitude) * (Math.PI / 180); // Convert to radians
//                         const altitude = positionGd.height;

//                         const radius = 1 + altitude / 6371;  // Earth radius + altitude
//                         const x = radius * Math.cos(latitude) * Math.cos(longitude);
//                         const y = radius * Math.cos(latitude) * Math.sin(longitude);
//                         const z = radius * Math.sin(latitude);

//                         points.push(new THREE.Vector3(x, y, z));
//                     }
//                 }

//                 // Log points for debugging
//                 console.log('Satellite path points:', points); // Moved inside the loop

//                 // Create geometry and line material
//                 const geometry = new THREE.BufferGeometry().setFromPoints(points);
//                 const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
//                 const line = new THREE.Line(geometry, material);
//                 scene.add(line); // Add the line to the scene
//             }
//         })
//         .catch(error => console.error('Error loading satellite paths:', error));
// }

// // Event listener for the button click
// const button = document.getElementById('path');
// button.addEventListener('click', () => loadSatellitePaths(scene)); // Pass the scene when calling the function
