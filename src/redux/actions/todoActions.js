import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TASK_COMPLETION, UPDATE_ALARM_STATUS } from '../types';
// Add Todo
export const addTodo = (text, dueDate) => {
  return {
    type: ADD_TODO,
    payload: { text, dueDate },
  };
};
// Edit Todo
export const editTodo = (id, newText, newDueDate) => {
  return {
    type: EDIT_TODO,
    payload: { id, newText, newDueDate },
  };
};
// Delete Todo
export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
};
// Toggle Todo completion
export const toggleTaskCompletion = (id) => {
  return {
    type: TOGGLE_TASK_COMPLETION,
    payload: { id },
  };
};
// Update Alarm Status for Todos
export const updateAlarmStatus = () => {
  return {
    type: UPDATE_ALARM_STATUS,
  };
};
