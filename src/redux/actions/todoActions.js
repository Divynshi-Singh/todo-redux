import { ADD_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_TODO, UPDATE_ALARM_STATUS } from "../types";
import { fetchTodoStatusColor } from "../../utils/utils";
export const addTodo = (text, dueDate) => {
  return {
    type: ADD_TODO,
    payload: {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
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

export const updateAlarmStatus = () => (dispatch, getState) => {
  const { todos } = getState();

  const updatedTodos = todos.map((todo) => ({
    ...todo,
    alarmStatusColor: fetchTodoStatusColor(todo.dueDate, todo.completed),
  }));

  dispatch({
    type: UPDATE_ALARM_STATUS,
    payload: updatedTodos,
  });
};