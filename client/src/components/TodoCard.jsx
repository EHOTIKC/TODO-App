import { useState, useRef, useEffect } from "react";

function getPriorityStyles(priority) {
  if (priority >= 8) return { badge: "bg-red-600/20 text-red-400 border-red-500/40", dot: "bg-red-500" };
  if (priority >= 4) return { badge: "bg-yellow-600/20 text-yellow-400 border-yellow-500/40", dot: "bg-yellow-400" };
  return { badge: "bg-green-600/20 text-green-400 border-green-500/40", dot: "bg-green-400" };
}

function getPriorityTextColor(priority) {
  if (priority >= 8) return "text-red-500";    
  if (priority >= 4) return "text-yellow-400"; 
  return "text-green-400";                     
}

function TodoCard({ todo, toggleDone, removeTodo, updatePriority, isDragging }) {
  const [editingPriority, setEditingPriority] = useState(false);
  const selectRef = useRef(null);
  const priorityStyles = getPriorityStyles(todo.priority);

  useEffect(() => {
    if (editingPriority && selectRef.current) selectRef.current.focus();
  }, [editingPriority]);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    updatePriority(todo._id, value);
    setEditingPriority(false);
  };

  return (
    <div
      className={`flex justify-between items-start p-6 rounded-lg shadow-md transition-colors duration-150 ${
        isDragging ? "bg-gray-700 shadow-xl" : "bg-gray-800 hover:shadow-xl"
      }`}
    >
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex items-start gap-4 w-full">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleDone(todo._id)}
            className="w-5 h-5 mt-1 accent-blue-500 shrink-0"
          />
          <span
            className={`text-lg break-all whitespace-pre-wrap flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-100"}`}
          >
            {todo.text}
          </span>


        </div>

        <div>
          <div
            className={`relative inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm w-fit cursor-pointer transition ${priorityStyles.badge}`}
            onClick={() => setEditingPriority(true)}
          >
            <span className={`w-2 h-2 rounded-full ${priorityStyles.dot}`} />

            <select
              ref={selectRef}
              value={todo.priority}
              onChange={handleChange}
              onBlur={() => setEditingPriority(false)}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer text-inherit"
            >
              {[...Array(10)].map((_, i) => {
                const p = i + 1;
                let optionColor = "";
                if (p <= 3) optionColor = "text-green-400";
                else if (p <= 7) optionColor = "text-yellow-400";
                else optionColor = "text-red-500";

                return (
                  <option
                    key={p}
                    value={p}
                    className={`${optionColor} bg-gray-800 px-2 py-1`}
                  >
                    Priority {p}
                  </option>
                );
              })}
            </select>

            <span className={getPriorityTextColor(todo.priority)}>
              Priority {todo.priority}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => removeTodo(todo._id)}
        className="w-10 h-10 shrink-0 flex items-center justify-center bg-red-600 rounded-full text-white hover:bg-red-700 transition cursor-pointer ml-2"
      >
        ✕
      </button>
    </div>
  );
}

export default TodoCard;
