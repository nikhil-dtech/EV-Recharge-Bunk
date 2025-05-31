const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://ev-recharge-bunk.onrender.com";

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to view this page.');
    window.location.href = 'login.html';
    return;
  }

  const userId = parseJwt(token).userId;
  const list = document.getElementById('historyList');

  try {
    const res = await fetch(`${BASE_URL}/api/bookings`);
    const bookings = await res.json();

    const userBookings = bookings.filter(b => b.userId?._id === userId);

    if (userBookings.length === 0) {
      list.innerHTML = "<li>No bookings found.</li>";
    } else {
      list.innerHTML = '';
      userBookings.forEach(b => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>Station:</strong> ${b.stationId?.name || 'Unknown'}<br>
          <strong>Date:</strong> ${b.slotTime?.split('T')[0] || 'N/A'}<br>
          <strong>Time:</strong> ${b.slotTime?.split('T')[1]?.slice(0,5) || 'N/A'}
        `;
        list.appendChild(li);
      });
    }
  } catch (err) {
    list.innerHTML = "<li>Error fetching bookings.</li>";
  }
});

function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
  } catch (e) {
    return {};
  }
}
