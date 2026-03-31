const BASE_URL = "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Request failed");
  }
  if (res.status === 204) return null;
  return res.json();
}

// Projects
export const getProjects = () => request("/projects");
export const createProject = (data) => request("/projects", { method: "POST", body: JSON.stringify(data) });
export const updateProject = (id, data) => request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProject = (id) => request(`/projects/${id}`, { method: "DELETE" });

// Tasks
export const getTasks = (params = {}) => {
  const qs = new URLSearchParams(Object.entries(params).filter(([,v]) => v != null)).toString();
  return request(`/tasks${qs ? "?" + qs : ""}`);
};
export const createTask = (data) => request("/tasks", { method: "POST", body: JSON.stringify(data) });
export const updateTask = (id, data) => request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: "DELETE" });

// Stats
export const getStats = () => request("/stats");
