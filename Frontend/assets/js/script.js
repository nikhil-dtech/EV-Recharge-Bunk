const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://ev-recharge-bunk.onrender.com";


'use strict';

/**
 * #PRELOADING
 */
const loadElement = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  loadElement.classList.add("loaded");

  // Auth setup
  const token = localStorage.getItem('token');
  const userInfo = document.getElementById('userInfo');
  const logoutBtn = document.getElementById('logoutBtn');

  if (token && userInfo && logoutBtn) {
    const decoded = parseJwt(token);
    userInfo.innerText = `👋 Welcome, ${decoded.name}`;
    logoutBtn.style.display = 'inline-block';
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  }

  // Load data
  loadStations();
  loadMap();
  scrollReveal();
});

/**
 * #MOBILE NAVBAR TOGGLE
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

if (navbar && navToggler) {
  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    navToggler.classList.toggle("active");
  };
  navToggler.addEventListener("click", toggleNavbar);
}

/**
 * #HEADER
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-go-top-btn]");

window.addEventListener("scroll", function () {
  if (!header || !backTopBtn) return;

  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


/**
 * #SCROLL REVEAL
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0, x = revealElements.length; i < x; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
};

function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
  } catch (e) {
    return {};
  }
}

// Load stations and populate list and dropdown
async function loadStations() {
  const stationList = document.getElementById('stationList');
  const stationSelect = document.getElementById('stationSelect');

  try {
    const res = await fetch(`${BASE_URL}/api/bookings/stations`);
    const stations = await res.json();

    stations.forEach(station => {
      const li = document.createElement('li');
      li.textContent = `${station.name} - ${station.location}`;
      stationList.appendChild(li);

      const option = document.createElement('option');
      option.value = station._id;
      option.textContent = station.name;
      stationSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Failed to load stations:', err);
  }
}

async function loadMap() {
  const map = L.map('stationMap').setView([28.61, 77.2], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  try {
    const res = await fetch(`${BASE_URL}/api/bookings/stations`);
    const stations = await res.json();

    stations.forEach(station => {
      if (station.latitude && station.longitude) {
        L.marker([station.latitude, station.longitude])
          .addTo(map)
          .bindPopup(`
            <strong>${station.name}</strong><br>${station.location}<br>
            <button onclick="openMapBooking('${station._id}', '${station.name}')">Book Now</button>
          `);
      }
    });
  } catch (err) {
    console.error('Failed to load stations for map:', err);
  }
}

function openMapBooking(stationId, stationName) {
  const stationSelect = document.getElementById('stationSelect');
  for (let option of stationSelect.options) {
    if (option.textContent === stationName) {
      option.selected = true;
      break;
    }
  }

  const bookingForm = document.getElementById('bookingSection');
  bookingForm.scrollIntoView({ behavior: 'smooth' });
}

// Handle slot booking
const bookingFormElement = document.getElementById('bookingForm');
bookingFormElement?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) return alert('You must be logged in to book.');

  const userId = parseJwt(token).userId;
  const stationId = document.getElementById('stationSelect').value;
  const date = document.getElementById('dateInput').value;
  const time = document.getElementById('timeInput').value;

  try {
    const res = await fetch(`${BASE_URL}/api/bookings/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, stationId, date, time }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('✅ Booking successful!');
    } else {
      alert(result.message || 'Booking failed');
    }
  } catch (err) {
    alert('⚠️ Server error during booking.');
  }
});
