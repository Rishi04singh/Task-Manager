# 📝 MERN Task Manager App

A full-stack **Task Manager application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
This app allows users to **add, update, delete, mark tasks as completed**, and **search tasks** in real time.

---

## 🚀 Features

- ✅ Add new tasks
- ✏️ Update existing tasks
- ❌ Delete tasks
- ✔️ Mark tasks as completed / uncompleted
- 🔍 Search tasks by name
- 🌐 REST API based backend
- 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap
- React Icons
- React Toastify
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

---

## 📂 Project Structure


MERN-Task-Manager-App-deploy/
│
├── backend/
│ ├── Models/
│ │ ├── db.js
│ │ └── Task.js
│ ├── Routes/
│ │ └── TaskRouter.js
│ ├── index.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── TaskManager.js
│ │ ├── TaskManager.css
│ │ ├── api.js
│ │ └── utils.js
│ ├── package.json
│ └── public/
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Rishi04singh/Task-Manager.git
cd Task-Manager
2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend/:

PORT=8080
DB_URL=mongodb://127.0.0.1:27017/taskmanager

Start backend server:

npm start

Backend will run on:

http://localhost:8080
3️⃣ Frontend Setup

Open a new terminal:

cd frontend
npm install
npm start

Frontend will run on:

http://localhost:3000
