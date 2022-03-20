import React, { useState, useEffect } from "react";
import Item from "./Item";

const Todo = () => {
  const [todos, setTodos] = useState([""]);

  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("")

  useEffect(() => {
    if (localStorage.items) {
      setTodos(JSON.parse(localStorage.getItem("items")));
    } else {
      setTodos([]);
    }
  }, []);
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "" || date === "") {
      return;
    }
    let todoObject = {
      id: todos.length + 1,
      task: todo,
      date: date,
      completed: false,
    };
    localStorage.setItem("items", JSON.stringify([...todos, todoObject]));
    setTodos([...todos, todoObject]);
    setTodo("");
    setDate("")
  };
//   deleteTodo = (event)=> {
//     this.state.todoList.splice(event.target.value, 1)
//     this.setState({
//         todoList: this.state.todoList
//     })
// }
  const completedTodo = (index) => {
    const newList = todos.map((list) => {
      if (list.id === index) {
        list.completed = !list.completed;
      }

      return list;
    });
    localStorage.setItem("items", JSON.stringify(newList));
    setTodos(newList);
  };

  return (
    <div className="container">
      {" "}
      <div className="body">
        {" "}
        <h3>To do list</h3>
        <div className="todo-form">
          {" "}
          <form onSubmit={handleSubmit}>
             <h3 style={{ display: "flex", padding: "0px 6px" }}>New task</h3>
            <label>

              <input
                type="text"
                value={todo}
                name="todo"
                onChange={handleChange}
              />
            </label>
            <input className="date" value={date} name="date" onChange={handleChangeDate} type="date" id="start"/>
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
          {todos.length > 0 ? (
            <div className="todo-box">
              <h3>Dates</h3>
              {todos.map((todoItem) => {
                return (
                  <Item
                    todoItem={todoItem}
                    completedTodo={completedTodo}
                    setTodos={setTodos}
                    todos={todos}
                    key={todoItem.id}
                  />
                );
              })}
            </div>
          ) : (
            <div>You have no todos</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
