import React from 'react';

const Todo = ({ todo, onDelete, onToggle }) => {
  return (
    <div style={{
      textDecoration: todo.completed ? 'line-through' : 'none',
      marginBottom: '10px',
    }}>
      <span>{todo.text}</span>
      <button onClick={() => onToggle(todo._id)} style={{ marginLeft: '10px' }}>✔️</button>
      <button onClick={() => onDelete(todo._id)} style={{ marginLeft: '5px' }}>❌</button>
    </div>
  );
};

export default Todo;
