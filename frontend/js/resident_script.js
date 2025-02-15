// Dummy data for available guards
const guards = [
  {
    id: "G101",
    name: "John Doe",
    contact: "+1 234 567 890",
    lat: 28.6139,
    lng: 77.209,
    rating: 4.5,
  },
  {
    id: "G102",
    name: "Mike Ross",
    contact: "+1 987 654 321",
    lat: 28.6145,
    lng: 77.206,
    rating: 4.2,
  },
  {
    id: "G103",
    name: "Sarah Smith",
    contact: "+1 876 543 210",
    lat: 28.616,
    lng: 77.211,
    rating: 4.7,
  },
];

// Initialize map
const map = L.map("map").setView([28.6139, 77.209], 14);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Populate guards list and add markers
const guardList = document.getElementById("guardList");
guards.forEach((guard) => {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item";
  listItem.textContent = `${guard.name} (${guard.id})`;
  listItem.onclick = () => showGuardDetails(guard);
  guardList.appendChild(listItem);

  // Add marker to map
  const marker = L.marker([guard.lat, guard.lng]).addTo(map);
  marker
    .bindPopup(`<b>${guard.name}</b><br>Click for details`)
    .on("click", () => showGuardDetails(guard));
});

// Show guard details in modal
function showGuardDetails(guard) {
  document.getElementById("guardName").textContent = guard.name;
  document.getElementById("guardID").textContent = guard.id;
  document.getElementById("guardContact").textContent = guard.contact;
  document.getElementById(
    "guardLocation"
  ).textContent = `${guard.lat}, ${guard.lng}`;
  document.getElementById("guardRating").textContent = guard.rating;
  new bootstrap.Modal(document.getElementById("guardDetailsModal")).show();
}
