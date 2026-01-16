import express from "express";
import {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  reorderTodos,
  updateTodoPriority,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/reorder", reorderTodos);
router.patch("/:id", toggleTodo);
router.patch("/:id/priority", updateTodoPriority);
router.delete("/:id", deleteTodo);


export default router;
