const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTodos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(todo) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function toggleTodo(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to toggle todo");
  return res.json();
}



export async function deleteTodo(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
  return true;
}

export const updateTodoPriority = async (id, priority) => {
  const res = await fetch(`${API_URL}/${id}/priority`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priority }),
  });

  if (!res.ok) throw new Error("Failed to update priority");
  return res.json();
};




export const updateTodoOrder = async (todos) => {
  const items = todos.map(todo => ({
    id: todo._id.toString(),
    order: Number(todo.order)
  }));

  const res = await fetch(`${API_URL}/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Reorder failed:", errText);
    throw new Error("Failed to update order");
  }

  return res.json();
};

