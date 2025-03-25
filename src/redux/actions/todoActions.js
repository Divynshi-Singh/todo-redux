import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TODO } from "../types";

export const addTodo = (text, dueDate) => {
  return {
    type: ADD_TODO,
    payload: {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      alarmStatusColor: "rgb(182, 120, 255)",
    },
  };
};

export const editTodo = (id, newText, newDueDate) => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      newText,
      newDueDate,
    },
  };
};

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});
