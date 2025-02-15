// // Set map location (latitude, longitude)
// const map = L.map("map").setView([28.7041, 77.1025], 12); // Example: Delhi

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// // Add a marker - permanenetly
// let g1 = L.marker([28.7041, 77.1025])
//   .addTo(map)
//   .bindPopup("Guard1")
//   .openPopup();

// let g2 = L.marker([28.75, 77.1025]).addTo(map).bindPopup("Guard2").openPopup();

// let g3 = L.marker([28.75, 77.2]).addTo(map).bindPopup("Guard3").openPopup();

// let lati = 28.7041;
// let longi = 77.1025;

// //updating an existing marker using fetch method and intervals
// // setInterval (() => {

// // lati += 0.1
// // longi += 0.1

// // g1.setLatLng ([lati, longi])
// // .bindPopup(`Guard moved to: ${lati}, ${longi}`)
// //             .openPopup();

// // }, 5000)

// // Add a Circle in Sector-3, Rohini
// L.circle([28.7206, 77.1105], {
//   color: "blue", // Border color
//   fillColor: "rgba(255, 0, 0, 0.3)", // Fill color with transparency
//   fillOpacity: 0.3, // Opacity of the fill
//   radius: 500, // Radius in meters (adjust as needed)
// })
//   .addTo(map)
//   .bindPopup("Sector-3, Rohini - Restricted Area");









  var map = L.map('map').setView([51.505, -0.09], 13); // Coordinates of initial location (London)

  // Add a tile layer to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add a marker on the map (adjust coordinates for live location)
  var marker = L.marker([51.505, -0.09]).addTo(map);

  // Emergency Alert function
  function sendEmergencyAlert() {
    alert("⚠ Emergency Alert triggered! Help is on the way.");
  }

  // Change Guard Profile and Shift Details
  function changeGuardProfile(guard) {
    if (guard === 'Guard1') {
      document.querySelector('.guard-profile-card h4').textContent = "👮 Guard Profile - Guard1";
      document.getElementById('guard-name').textContent = "Harsh";
      document.getElementById('guard-id').textContent = "G12345";
      document.getElementById('guard-contact').textContent = "+1 234 567 890";
      document.getElementById('guard-status').textContent = "On Duty";
      document.getElementById('current-shift').textContent = "8:00 AM - 4:00 PM";
      document.getElementById('duty-location').textContent = "Sector 22, North Gate";
      document.getElementById('next-shift').textContent = "4:00 PM - 12:00 AM";
    } else if (guard === 'Guard2') {
      document.querySelector('.guard-profile-card h4').textContent = "👮 Guard Profile - Guard2";  
      document.getElementById('guard-name').textContent = "Guard2";
      document.getElementById('guard-id').textContent = "G54321";
      document.getElementById('guard-contact').textContent = "+1 987 654 321";
      document.getElementById('guard-status').textContent = "On Duty";
      document.getElementById('current-shift').textContent = "2:00 PM - 10:00 PM";
      document.getElementById('duty-location').textContent = "Sector 15, South Gate";
      document.getElementById('next-shift').textContent = "10:00 PM - 6:00 AM";
    }
    else if (guard === 'Guard3') {
      document.querySelector('.guard-profile-card h4').textContent = "👮 Guard Profile - Guard3";  
      document.getElementById('guard-name').textContent = "Guard3";
      document.getElementById('guard-id').textContent = "G54398";
      document.getElementById('guard-contact').textContent = "+1 936 685 543";
      document.getElementById('guard-status').textContent = "Off Duty";
      document.getElementById('current-shift').textContent = "6:00 PM - 12:00 PM";
      document.getElementById('duty-location').textContent = "Sector 20, East Gate";
      document.getElementById('next-shift').textContent = "8:00 PM - 4:00 AM";
    }
  }