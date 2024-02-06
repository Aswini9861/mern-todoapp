import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "./navbar";
import { useAuth } from "./context/auth";
const Profile = () => {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoid, setTodoid] = useState([]);
  const [auth, setAuth] = useAuth("");


  const [value, setValue] = useState("");

  const handleLogout = () => {
    setData([]);
  };

  useEffect(() => {
    if (!auth?.token || !auth?.user) {
      setData([]);
    }
  }, []);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:7000/api/v1/todo/todos"
      );
      setData(data.todo);
    } catch (error) {
      toast.error("Something went wrong while getting product");
    }
  };

  // create todo
  const handleCreate = async (e) => {
    //e.preventDefault();
    try {
      if (auth?.token && auth?.user) {
        const { data } = await axios.post(
          "http://127.0.0.1:7000/api/v1/todo/create-todo",
          { todoName: todo }
        );
        console.log(data);
        if (data.success) {
          await getTodo();
        }
      } else {
        // User is not authenticated, clear todos locally
        setData([]);
        toast.error("You need to be logged in to create a todo.");
      }

      console.log(data);
    } catch (error) {
      toast.error("something went wrong while create todo");
    }
  };

  // delete todo
  const handleDelete = async (todoId) => {
    //e.preventDefault();

    try {
      const { data } = await axios.delete(
        `http://127.0.0.1:7000/api/v1/todo/delete-todo/${todoId}`
      );
      if (data?.success) {
        toast.error("successfully deleted todo");

        await getTodo();
      }

      console.log(data);
    } catch (error) {
      toast.error("something went wrong while delete todo");
    }
  };

  // get single todo
  const handleGet = async (todoId) => {
    //e.preventDefault();

    try {
      const { data } = await axios.get(
        `http://127.0.0.1:7000/api/v1/todo/single-todo/${todoId}`
      );
      console.log(data);
      if (data?.success) {
        setTodo(data.todo.todoName);
        setTodoid(data.todo._id);
      }
    } catch (error) {
      toast.error("something went wrong while update todo");
    }
  };

  //update todo
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://127.0.0.1:7000/api/v1/todo/update-todo/${todoid}`,
        { todoName: todo }
      );

      if (data?.success) {
        toast.success("Successfully updated todo");
        getTodo();
      }
    } catch (error) {
      toast.error("something went wrong while updating todo");
    }
  };

  const handleSelectChange = (taskId, event) => {
    const updatedData = data.map((item) =>
      item._id === taskId ? { ...item, status: event.target.value } : item
    );
    setData(updatedData);
  };
  console.log(value)

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="ml-10 mt-8 flex justify-center items-center">
        <label htmlFor="first_name" className="text-gray-700 mr-4 font-bold">
          Todo Name:
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-100 border border-gray-300 text-gray-800 text-sm py-2 px-4 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your todo text"
          required
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
      </div>
      <div className="ml-50 mt-8 flex justify-center items-center">
        <button
          onClick={handleCreate}
          className="mt-4 ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Create Todo
        </button>

        <button
          className="mt-4 ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={handleUpdate}
        >
          Update Todo
        </button>
      </div>


      {data.map((e) => (
        <div
          className="flex items-center mt-4 ml-15 p-4 border border-gray-300 rounded-lg"
          key={e._id}
        >
          <h4 className={`flex-grow text-xl font-semibold mr-4 ${e.status === 'Completed' ? 'completed' : ''}`}>{e.todoName}</h4>
          <select value={e.status} onChange={(event) => handleSelectChange(e._id, event)}>
            <option value="Completed">Completed</option>
            <option  selected="selected" value="Not Completed">Not Completed</option>
            <option value="In Progerss">In Progerss</option>
          </select>

          <div className="flex">
            <button
              type="button"
              onClick={() => handleDelete(e._id)}
              className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              Delete
            </button>

            <button
              type="button"
              onClick={() => handleGet(e._id)}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 ml-2"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Profile;
