# 🗂️ TaskFlow — Project Management Tool

A full stack project management tool similar to Trello, built with MERN stack.
Built as **Task 2** of the **CodeAlpha Full Stack Developer Internship**.

---


## 📌 Features

- 👤 User registration and login
- 🔐 JWT Authentication
- 📋 Create and manage projects
- ✅ Create tasks inside projects
- 🗂️ Kanban board — Todo, In Progress, Done
- 🔄 Move tasks between columns
- 🗑️ Delete projects and tasks
- 📊 Project dashboard with all tasks
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Context API (Auth)

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs (Password Hashing)

### Database
- MongoDB Atlas (Mongoose ODM)

### Deployment
- Frontend → Vercel
- Backend → Render

---

## 📁 Project Structure

```
project-management-tool/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── projects.js
│   │   │   └── tasks.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    └── vite-project/
        ├── src/
        │   ├── components/
        │   │   └── Navbar.jsx
        │   ├── pages/
        │   │   ├── Login.jsx
        │   │   ├── Register.jsx
        │   │   ├── Dashboard.jsx
        │   │   └── ProjectBoard.jsx
        │   ├── context/
        │   │   └── AuthContext.jsx
        │   └── App.jsx
        └── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project |
| GET | /api/projects/:id | Get single project |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/tasks/:projectId | Get tasks by project |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task status |
| DELETE | /api/tasks/:id | Delete task |
| POST | /api/tasks/:id/comments | Add comment |

---

## ⚙️ Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup

```bash
# Go to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
PORT=5001

# Run backend
npm run dev
```

### Frontend Setup

```bash
# Go to frontend folder
cd frontend/vite-project

# Install dependencies
npm install

# Run frontend
npm run dev
```

---

## 🎯 How to Use

```
1. Register a new account
2. Login with your credentials
3. Create a new project
4. Open the project board
5. Add tasks to the board
6. Move tasks between columns:
   Todo → In Progress → Done
7. Delete tasks when completed
```

---

## 📸 Screenshots

### Dashboard
- View all your projects
- Create new projects
- Delete projects

### Project Board
- Kanban style board
- 3 columns: Todo, In Progress, Done
- Add and manage tasks
- Move tasks between columns

---

## 👩‍💻 Built By

**Nihaarika Tholu**
B.Tech CSE — Anurag University, Hyderabad
[LinkedIn](https://www.linkedin.com/in/nihaarika-tholu-b9186129b/) | [GitHub](https://github.com/Thol-444)

---

## 📜 Internship

This project was built as **Task 2** of the
**CodeAlpha Full Stack Developer Internship**

---

⭐ If you found this helpful, give it a star!
