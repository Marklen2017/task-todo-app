import React, { useState } from "react";

const Item = ({ todoItem, completedTodo, setTodos, todos }) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(todoItem.task);
  const [date, setDate] = useState(todoItem.date);

  const handleEditChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = (id) => {
    let todos = JSON.parse(localStorage.getItem('items'))
    let todoKeys = Object.keys(todos);

    todoKeys.forEach(key => {
      const todo =  todos[key]
      console.log(todo)
    })

    let index = todos.findIndex(item => item.id === id)
    todos.splice(index);
    localStorage.setItem("items", JSON.stringify(todos));
    window.location.reload(false);
    if (todos.length === 0) {
      localStorage.removeItem("items");
    } 
   }

  const handleEditSubmit = (id) => {
    const editedList = todos.map((oneTodo) => {
      if (oneTodo.id === id) {
        oneTodo.task = todo;
        oneTodo.date = date;
      }
      return oneTodo;
    });
    localStorage.setItem("items", JSON.stringify(editedList));
    setTodos(editedList);
    handleEdit();
  };
  return (
    <div className="todo" key={todoItem.id}>
      {!edit ? (
        <>
          <input
            type="checkbox"
            checked={todoItem.completed}
            onChange={() => completedTodo(todoItem.id)}
            disabled={todoItem.completed ? true : false}
          />{" "}
          <span>{todoItem.date}</span>{" "}
          <button onClick={handleEdit} disabled={todoItem.completed}>
            Edit
          </button>
          <button onClick={handleDelete}>
            Delete
          </button>
        </>
      ) : (
        <>
          {" "}
          <input
            type="text"
            value={todo}
            name="todo"
            onChange={handleEditChange}
          />
          <input
            type="text"
            value={date}
            type="date"
            name="date"
            onChange={handleEditChangeDate}
          />
          <button onClick={handleEdit}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>

          <button type="submit" onClick={() => handleEditSubmit(todoItem.id)}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Item;
