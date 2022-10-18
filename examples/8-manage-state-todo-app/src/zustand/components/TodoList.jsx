import React from 'react';
import useTodoStore from '../stores/TodoStore';

function TodoList(props) {
  const todos = useTodoStore(state => state.todos);
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const completeTodo = useTodoStore(state => state.completeTodo);
  const markAsEditing = useTodoStore(state => state.markAsEditing);
  const updateTodo = useTodoStore(state => state.updateTodo);
  const cancelEdit = useTodoStore(state => state.cancelEdit);
  const completeAllTodos = useTodoStore(state => state.completeAllTodos);
  const remaining = useTodoStore(state => state.remaining);

  return (
    <>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />

              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => markAsEditing(todo.id)}
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  type="text"
                  onBlur={event => updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      cancelEdit(event, todo.id);
                    }
                  }}
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="x-button">
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="check-all-container">
        <div>
          <button onClick={completeAllTodos} className="button">
            Check All
          </button>
        </div>

        <span>{remaining()} items remaining</span>
      </div>
    </>
  );
}

export default TodoList;
