const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getTasks = async () => {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
};

export const createTask = async (task) => {
    const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
};

export const updateTask = async (id, task) => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
};

export const deleteTask = async (id) => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return true;
};
