import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
  
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim().length < 3) return;
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodo(""); 
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    const currentTodo = todos.find((item) => item.id === id);
    setTodo(currentTodo.todo);
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleDelete = (e, id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container w-[90%] mx-auto text-center bg-violet-200 rounded-3xl min-h-[85vh]">
        <div className="mt-3 px-10 py-2 text-lg font-bold">
          <div className="addTodo">
            <h2 className="text-xl">iTasks</h2>
            <input
              onChange={handleChange}
              value={todo}
              className="text-center p-1 rounded-lg ms-20 w-2/4 font-normal mt-3"
              type="text"
              placeholder="Type Your ToDo (min-3 letters)"
            />
            <button
              onClick={handleAdd}
              disabled={todo.trim().length < 3}
              className="bg-violet-800 hover:bg-violet-950 py-1 px-4 rounded-md ms-4 text-white"
            >
              Add
            </button>
          </div>

          <h2 className="text-lg font-bold text-violet-700 mt-5">Your ToDos</h2>
          <div className="todos mt-11">
            {todos.length === 0 && (
              <div className="text-neutral-400 mt-40">No ToDos To Display</div>
            )}
            {todos.map((item) => (
              <div
                key={item.id}
                className="todo flex font-medium justify-between w-[80%] mt-1"
              >
                <div className="flex gap-5">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    className="cursor-pointer"
                    checked={item.isCompleted}
                    name={item.id}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 py-1 px-3 rounded-md mx-1 text-sm text-white font-normal"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 py-1 px-2 rounded-md mx-1 text-sm font-normal text-white"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
