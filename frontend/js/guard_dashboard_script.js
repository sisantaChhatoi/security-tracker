// Set map location (latitude, longitude)
const map = L.map("map").setView([28.7041, 77.1025], 12); // Example: Delhi

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Add a marker - permanenetly
let g1 = L.marker([28.7041, 77.1025])
  .addTo(map)
  .bindPopup("Guard1")
  .openPopup();

let g2 = L.marker([28.75, 77.1025]).addTo(map).bindPopup("Guard2").openPopup();

let g3 = L.marker([28.75, 77.2]).addTo(map).bindPopup("Guard3").openPopup();

let lati = 28.7041;
let longi = 77.1025;

//updating an existing marker using fetch method and intervals
// setInterval (() => {

// lati += 0.1
// longi += 0.1

// g1.setLatLng ([lati, longi])
// .bindPopup(`Guard moved to: ${lati}, ${longi}`)
//             .openPopup();

// }, 5000)

// Add a Circle in Sector-3, Rohini
L.circle([28.7206, 77.1105], {
  color: "blue", // Border color
  fillColor: "rgba(255, 0, 0, 0.3)", // Fill color with transparency
  fillOpacity: 0.3, // Opacity of the fill
  radius: 500, // Radius in meters (adjust as needed)
})
  .addTo(map)
  .bindPopup("Sector-3, Rohini - Restricted Area");
