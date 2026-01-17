function SortBar({ sort, setSort }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setSort("asc")}
        className={`px-3 py-1 rounded ${
          sort === "asc" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-200"
        }`}
      >
        Priority ↑
      </button>

      <button
        onClick={() => setSort("desc")}
        className={`px-3 py-1 rounded ${
          sort === "desc" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-200"
        }`}
      >
        Priority ↓
      </button>

      <button
        onClick={() => setSort("none")}
        className="px-3 py-1 rounded bg-gray-700 text-gray-200"
      >
        Default
      </button>
    </div>
  );
}

export default SortBar;
