import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TODO, UPDATE_ALARM_STATUS } from '../types';
import { fetchTodoStatusColor } from '../../utils/utils';

const initialState = {
  todos: Array.isArray(JSON.parse(localStorage.getItem('todos'))) ? JSON.parse(localStorage.getItem('todos')) : [],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        dueDate: action.payload.dueDate || null,
        alarmStatusColor: action.payload.dueDate
          ? fetchTodoStatusColor(action.payload.dueDate, false)
          : 'rgb(182, 120, 255)',
      };
      const updatedAddTodos = [...state.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedAddTodos));
      return { ...state, todos: updatedAddTodos };

    case EDIT_TODO:
      const updatedEditTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? {
            ...todo,
            text: action.payload.newText,
            dueDate: action.payload.newDueDate,
            alarmStatusColor: action.payload.newDueDate
              ? fetchTodoStatusColor(action.payload.newDueDate, todo.completed)
              : todo.alarmStatusColor,
          }
          : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedEditTodos));
      return { ...state, todos: updatedEditTodos };

    case DELETE_TODO:
      const updatedDeleteTodos = state.todos.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem('todos', JSON.stringify(updatedDeleteTodos));
      return { ...state, todos: updatedDeleteTodos };

    case UPDATE_ALARM_STATUS:
      const updatedTodos = state.todos.map((todo) => ({
        ...todo,
        alarmStatusColor: fetchTodoStatusColor(todo.dueDate, todo.completed),
      }));
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };

    case TOGGLE_TODO:
      const updatedToggleTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? {
            ...todo,
            completed: !todo.completed,
            alarmStatusColor: fetchTodoStatusColor(todo.dueDate, !todo.completed),
          }
          : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedToggleTodos));
      return { ...state, todos: updatedToggleTodos };
    default:
      return state;
  }
};

export default todoReducer;
