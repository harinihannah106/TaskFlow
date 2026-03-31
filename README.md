# TaskFlow — Full Stack Task Manager

A production-grade task management app built with **React + FastAPI**. Perfect for your resume!

## 🛠 Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React 18, Vite, CSS     |
| Backend   | FastAPI, SQLAlchemy      |
| Database  | SQLite (dev) / PostgreSQL-ready |
| API Style | RESTful JSON API        |

---

## 📁 Project Structure

```
taskflow/
├── backend/
│   ├── main.py            # FastAPI app — routes, models, schemas
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── taskflow.js      # API service layer
    │   ├── components/
    │   │   ├── Sidebar.jsx      # Navigation sidebar
    │   │   ├── TaskCard.jsx     # Individual task card
    │   │   └── TaskModal.jsx    # Create/edit task modal
    │   ├── context/
    │   │   └── AppContext.jsx   # Global state management
    │   ├── pages/
    │   │   ├── Dashboard.jsx    # Stats overview
    │   │   ├── TaskBoard.jsx    # Kanban board view
    │   │   └── ProjectsPage.jsx # Project management
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Setup & Run

### Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

Backend runs at: **http://localhost:8000**  
Interactive API docs: **http://localhost:8000/docs**

---

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## ✨ Features

- ✅ **Dashboard** — Stats cards, progress bar, high-priority highlights
- ✅ **Kanban Board** — 3-column board (To Do / In Progress / Done)
- ✅ **Task Management** — Create, read, update, delete tasks
- ✅ **Projects** — Organize tasks into color-coded projects
- ✅ **Priorities** — Low / Medium / High with visual indicators
- ✅ **Due Dates** — With overdue detection
- ✅ **Filters** — Filter by priority and project
- ✅ **Completion Toggle** — One-click task completion

---

## 📡 API Endpoints

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | /projects         | List all projects  |
| POST   | /projects         | Create project     |
| PUT    | /projects/{id}    | Update project     |
| DELETE | /projects/{id}    | Delete project     |
| GET    | /tasks            | List tasks         |
| POST   | /tasks            | Create task        |
| GET    | /tasks/{id}       | Get single task    |
| PUT    | /tasks/{id}       | Update task        |
| DELETE | /tasks/{id}       | Delete task        |
| GET    | /stats            | Get dashboard stats|

---

## 🔮 Possible Enhancements (for interviews)

- Add user authentication (JWT + OAuth)
- Switch to PostgreSQL for production
- Add drag-and-drop on Kanban board
- Deploy backend to Render/Railway, frontend to Vercel
- Add unit tests (pytest + React Testing Library)
- WebSocket for real-time updates

---

## 💼 Resume Talking Points

- "Built a full stack task manager with **React** and **FastAPI** featuring a Kanban board, project organization, and real-time stats"
- "Designed a **RESTful API** with SQLAlchemy ORM, full CRUD operations, and automatic docs via OpenAPI/Swagger"
- "Implemented **global state management** with React Context API and a clean service layer for API abstraction"
