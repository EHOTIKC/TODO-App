import { useState } from "react";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    addTodo(text, priority);
    setText("");
    setPriority(1);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 w-full">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-gray-200">Task</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 4000))}
          placeholder="New task"
          className="p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-100 border-gray-700 resize-none"
          rows={3}
        />
        <span className="text-xs text-gray-400 mt-1">{text.length}/4000</span>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-gray-200">Priority (1–10)</label>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-100 border-gray-700"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition w-full"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
