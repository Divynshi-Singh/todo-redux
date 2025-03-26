import React, { useState } from "react";
import { IoAlarmOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import TodoDeleteModal from "./TodoDeleteModal";

const TodoItem = ({ todo, onEdit, toggleTaskCompletion, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const openDeleteOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(todo.id);
    setIsDeleteModalOpen(false);
  };

  const toggleTextExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = todo.text.length > 43 ? todo.text.substring(0, 43) + "..." : todo.text;
  return (
    <li
      key={todo.id}
      className={`flex items-center space-x-4  p-[7px] rounded-lg ${todo.completed ? "bg-green-100" : "bg-white"
        }`}
      style={{
        width: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        borderBottom: "1px solid rgb(235, 229, 229)",
      }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTaskCompletion(todo.id)}
        className="checkbox"
      />

      {/* Todo Text with Expansion */}
      <span className="text-content flex-1">
        <span className={`todo-text ${isExpanded ? "expanded" : "collapsed"}`}>
          {isExpanded ? todo.text : truncatedText}
        </span>

        {todo.text.length > 43 && (
          <button
            onClick={toggleTextExpansion}
            className="btn-more-less text-blue-600 bg-transparent text-sm mt-1 hover:underline"
          >
            {isExpanded ? "Read Less.." : "Read More.."}
          </button>
        )}

        {/* Due Date */}
        {todo.dueDate && (
          <div className="flex items-center space-x-2 mt-2">
            <IoAlarmOutline size={15} className="text-[gray] pt-[5px]" />
            <span className="text-sm text-gray-600 pt-[5px] text-[13px]">
              {moment(todo.dueDate).format("MMMM D, YYYY h:mm")}
            </span>
          </div>
        )}
      </span>

      {/* Alarm Status Indicator */}
      <div
        className={`w-[10px] h-[10px] border-none rounded-full m-[4px]`}
        style={{ backgroundColor: todo.alarmStatusColor }}
      ></div>

      {/* Edit and Delete Buttons */}
      <div className="flex space-x-3">
        <button onClick={() => onEdit(todo)} className="cursor-pointer bg-transparent border-none">
          <MdEdit size={16} className="text-gray-600 hover:text-[blue] " />
        </button>
        <button onClick={openDeleteOpen} className="cursor-pointer bg-transparent border-none">
          <FaTrashAlt size={14} className="text-gray-600 hover:text-[red] " />
        </button>
      </div>

      {/* Todo Delete Modal */}
      {isDeleteModalOpen && (
        <TodoDeleteModal
          todo={todo}
          onClose={closeDeleteModal}
          onDelete={handleDeleteConfirm}
        />
      )}
    </li>
  );
};

export default TodoItem;