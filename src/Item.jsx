import React, { useState } from "react";

const Item = ({ todoItem, completedTodo, setTodos, todos }) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(todoItem.task);
  const [date, setDate] = useState(todoItem.date);

  const handleEditChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = (name) => {
    console.log("ProductList.onDelete: ", name);
    todos = todos.filter(product => product.name !== name);
    setTodos({todos});
    console.log(todos)
    localStorage.setItem('items', JSON.stringify(todos));
  }

  const handleEditSubmit = (id) => {
    const editedList = todos.map((oneTodo) => {
      if (oneTodo.id === id) {
        console.log(id);
        oneTodo.task = todo;
      }
      return oneTodo;
    });
    localStorage.setItem("items", JSON.stringify(editedList));
    setTodos(editedList);
    handleEdit();
    console.log(todo, id);
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
          <span>{todoItem.date === todoItem.date ? todoItem.date : 'asdasd'}</span>{" "}
          <button onClick={handleEdit} disabled={todoItem.completed}>
            Edit
          </button>
          <button onClick={handleDelete} disabled={todoItem.completed}>
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
