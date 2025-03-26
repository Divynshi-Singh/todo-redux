import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TODO, UPDATE_ALARM_STATUS } from '../types';
import { fetchTodoStatusColor } from '../utils';
const initialState = JSON.parse(localStorage.getItem('todos')) || [];

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
      const updatedAddTodos = [...state, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedAddTodos));
      return updatedAddTodos;

    case EDIT_TODO:
      const updatedEditTodos = state.map((todo) =>
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
      return updatedEditTodos;

    case DELETE_TODO:
      const updatedDeleteTodos = state.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem('todos', JSON.stringify(updatedDeleteTodos));
      return updatedDeleteTodos;

    case UPDATE_ALARM_STATUS:
      const updatedTodos = state.map((todo) => ({
        ...todo,
        alarmStatusColor: fetchTodoStatusColor(todo.dueDate, todo.completed),
      }));
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;

    case TOGGLE_TODO:
      const updatedToggleTodos = state.map((todo) =>
        todo.id === action.payload.id
          ? {
            ...todo,
            completed: !todo.completed,
            alarmStatusColor: fetchTodoStatusColor(todo.dueDate, !todo.completed),
          }
          : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedToggleTodos));
      return updatedToggleTodos;

    default:
      return state;
  }
};

export default todoReducer;