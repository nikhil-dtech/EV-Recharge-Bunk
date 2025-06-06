const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://ev-recharge-bunk.onrender.com";

async function loadStations() {
  const res = await fetch(`${BASE_URL}/api/admin/stations`);
  const stations = await res.json();

  const list = document.getElementById('stationList');
  list.innerHTML = '';
  stations.forEach(station => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${station.name}</strong> - ${station.location} 
      (Lat: ${station.latitude}, Lng: ${station.longitude}, Slots: ${station.slots}) 
      <button onclick="deleteStation('${station._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function deleteStation(id) {
  await fetch(`${BASE_URL}/api/admin/stations/${id}`, {
    method: 'DELETE'
  });
  loadStations();
}

document.getElementById('addStationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const station = {
    name: document.getElementById('name').value,
    location: document.getElementById('location').value,
    latitude: parseFloat(document.getElementById('latitude').value),
    longitude: parseFloat(document.getElementById('longitude').value),
    slots: parseInt(document.getElementById('slots').value)
  };

  await fetch(`${BASE_URL}/api/admin/stations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(station)
  });

  e.target.reset();
  loadStations();
});

loadStations();