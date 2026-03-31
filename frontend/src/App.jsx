import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TaskBoard from "./pages/TaskBoard";
import ProjectsPage from "./pages/ProjectsPage";
import { AppProvider } from "./context/AppContext";
import "./index.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "tasks": return <TaskBoard />;
      case "projects": return <ProjectsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="app-shell">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </AppProvider>
  );
}
