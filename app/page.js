"use client";
import React, { useState } from "react";
import firebaseApp from "./firebase";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const completeHandler = (i) => {
    const copyTask = [...mainTask];
    const completedTask = copyTask.splice(i, 1)[0];
    completedTask.completed = !completedTask.completed;
    const newIndex = completedTask.completed ? 0 : copyTask.length;

    copyTask.splice(newIndex, 0, completedTask);
    setMainTask(copyTask);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = { title, desc, completed: false };
    setMainTask([...mainTask, newTask]);
    setTitle("");
    setDesc("");
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='bg-black text-white py-5 text-5xl font-bold text-center'>
        My Todo List
      </div>
      <div className='flex justify-center mt-8'>
        <form
          onSubmit={submitHandler}
          className='w-96 p-4 bg-white shadow-lg rounded-lg'
        >
          <input
            type='text'
            className='w-full mb-4 p-2 border rounded'
            placeholder='Enter Task here'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type='text'
            className='w-full mb-4 p-2 border rounded'
            placeholder='Description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className='w-full bg-black text-white p-2 rounded'>
            Add Task
          </button>
        </form>
      </div>
      <div className='flex justify-center mt-8'>
        <button
          onClick={() => setShowCompleted(false)}
          className={`mr-2 ${
            !showCompleted
              ? "bg-green-500 text-white font-bold"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setShowCompleted(true)}
          className={`mr-2 ${
            showCompleted
              ? "bg-green-500 text-white font-bold"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded`}
        >
          Completed Tasks
        </button>
      </div>
      <div className='flex justify-center mt-8'>
        <ul className='w-96 bg-white shadow-lg rounded-lg'>
          {mainTask.map((t, i) => {
            if (!showCompleted || t.completed) {
              return (
                <li key={i} className='border-b p-4 flex justify-between'>
                  <div>
                    <h5
                      className={`text-2xl font-bold ${
                        t.completed ? "line-through" : ""
                      }`}
                    >
                      {t.title}
                    </h5>
                    <p
                      className={`text-gray-600 ${
                        t.completed ? "line-through" : ""
                      }`}
                    >
                      {t.desc}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => completeHandler(i)}
                      className={`${
                        t.completed ? "bg-gray-500" : "bg-green-700"
                      } text-white p-2 rounded mr-2`}
                    >
                      {t.completed ? "Undo" : "Completed!!"}
                    </button>
                    <button
                      onClick={() => deleteHandler(i)}
                      className='bg-red-400 text-white p-2 rounded'
                    >
                      Delete!
                    </button>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
