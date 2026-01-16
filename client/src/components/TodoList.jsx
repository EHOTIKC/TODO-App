import TodoCard from "./TodoCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function TodoList({
  todos,
  toggleDone,
  removeTodo,
  updatePriority,
  onDragEnd,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todoList">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todos.length === 0 ? (
              <p className="text-gray-400 text-center mt-4">No tasks</p>
            ) : (
              todos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mb-4 transition-colors duration-150 ${
                        snapshot.isDragging ? "bg-gray-700" : ""
                      }`}
                      style={provided.draggableProps.style}
                    >
                      <TodoCard
                        todo={todo}
                        toggleDone={toggleDone}
                        removeTodo={removeTodo}
                        updatePriority={updatePriority}
                        isDragging={snapshot.isDragging}
                      />

                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
