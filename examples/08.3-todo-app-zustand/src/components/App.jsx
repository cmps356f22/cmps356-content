import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import '../reset.css';
import '../App.css';
import useTodoStore from '../stores/TodoStore';

function App() {
  const todos = useTodoStore(state => state.todos);

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm />

        {todos.length > 0 ? <TodoList /> : <NoTodos />}
      </div>
    </div>
  );
}

export default App;
