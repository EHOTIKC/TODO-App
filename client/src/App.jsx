import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";

import {
  fetchTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  updateTodoOrder,
  updateTodoPriority,
} from "./services/todoApi";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await fetchTodos();
        setTodos(data.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTodos();
  }, []);

  const addTodo = async (text, priority) => {
    try {
      const lastOrder = todos.length ? todos[todos.length - 1].order : 0;
      const newTodo = await createTodo({
        text,
        priority: Number(priority),
        order: lastOrder + 1,
      });
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDone = async (id) => {
    try {
      const updated = await toggleTodo(id);
      setTodos(prev =>
        prev.map(todo => (todo._id === id ? updated : todo))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updatePriority = async (id, priority) => {
    try {
      const updated = await updateTodoPriority(id, priority);
      setTodos(prev =>
        prev.map(todo => (todo._id === id ? updated : todo))
      );
    } catch (err) {
      console.error(err);
    }
  };


  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTodos = Array.from(todos);
    const [moved] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, moved);

    const todosWithOrder = updatedTodos.map((t, idx) => ({
      ...t,
      order: idx
    }));

    setTodos(todosWithOrder);

    try {
      await updateTodoOrder(todosWithOrder);
    } catch (err) {
      console.error("Failed to update order", err);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "done") return todo.completed;
    if (filter === "undone") return !todo.completed;
    return true;
  });

  if (loading) return <div className="p-6 text-xl text-gray-200">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-100 text-center">TODO App</h1>
        <TodoForm addTodo={addTodo} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TodoList
          todos={filteredTodos ?? []}
          toggleDone={toggleDone}
          removeTodo={removeTodo}
          updatePriority={updatePriority}
          onDragEnd={handleDragEnd}
        />

      </div>
    </div>
  );
}

export default App;
