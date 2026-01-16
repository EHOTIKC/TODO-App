function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex gap-2 mb-4">
      {["all", "done", "undone"].map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded ${
            filter === f
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
