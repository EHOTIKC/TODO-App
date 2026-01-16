import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ order: 1 });
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const { text, priority, dueDate } = req.body;

  const todo = await Todo.create({
    text,
    priority,
    dueDate: dueDate || null,
    order: Date.now(),
  });

  res.status(201).json(todo);
};

export const toggleTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();

  res.json(todo);
};

export const updateTodoPriority = async (req, res) => {
  try {
    const { priority } = req.body;

    if (priority < 1 || priority > 10) {
      return res.status(400).json({ message: "Invalid priority" });
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to update priority" });
  }
};


export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

export const reorderTodos = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items must be a non-empty array" });
    }

    const bulk = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }));

    await Todo.bulkWrite(bulk);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
