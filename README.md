# ⚡ EV Recharge Bunk – Web App for Electric Vehicle Charging Stations

A full-featured web application for managing and booking electric vehicle (EV) charging slots. Built using the MERN Stack (MongoDB, Express.js, React.js, Node.js), this system allows users to locate EV charging stations, register, log in, and book slots for charging.

## 🔗 Live Demo

> https://ev-recharge-bunk.onrender.com

---

## 🚀 Features

- 🧭 Locate nearby EV charging stations on the map
- 🔐 User authentication (Register/Login)
- 📆 Book available time slots for charging
- 🧑‍💼 Admin dashboard to manage stations and bookings
- 📍 Map integration with Leaflet + OpenStreetMap
- 📡 Real-time station status updates (available/booked)
- 📱 Mobile-responsive design

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
|------------|---------------------------------|
| Frontend   | React.js, Tailwind CSS          |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB                         |
| Auth       | JWT (JSON Web Token)            |
| Map        | Leaflet.js, OpenStreetMap       |
| API Comm   | Fetch API / Axios               |

---

## 📁 Folder Structure

EV-Recharge-Bunk/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js
├── server/ # Express backend
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── .env
├── package.json
└── README.md


---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/nikhil-dtech/EV-Recharge-Bunk.git
cd EV-Recharge-Bunk
```

### 2. Set up the Backend
```bash
cd server
npm install
```

### 3. Create a .env file in /server/ directory
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Start the backend
```bash
node server.js
```

### 5. Set up the Frontend
```bash
cd ../client
npm install
npm start
```

React app will run at http://localhost:3000, Backend at http://localhost:5000.
