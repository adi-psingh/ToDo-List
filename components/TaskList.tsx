"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTaskStore } from "../store/taskstore";
import DarkModeToggle from "../components/DarkModeToggle";

const fetchTasks = async () => {
  const response = await axios.get("/tasks.json");
  return response.data;
};

const TaskList = () => {
  const { tasks, setTasks } = useTaskStore();
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  if (isLoading) return <p className="text-center text-gray-500 dark:text-gray-300">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500 dark:text-red-400">Error loading tasks</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {}
      <DarkModeToggle />

      <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">Task List</h1>
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`p-6 flex justify-between items-center transition-transform hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 
            ${index !== tasks.length - 1 ? "border-b border-gray-300 dark:border-gray-700" : ""}`}
          >
            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white">{task.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
              <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {task.status}
              </span>
            </div>
            <button
              className={`px-5 py-2 text-lg font-semibold rounded-lg transition-colors shadow-md ${
              completedTasks[task.id]
                ? "bg-red-500 text-white" 
                  : "bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                onClick={() => {
                setTasks(tasks.map((t) =>
                t.id === task.id
                  ? { ...t, status: completedTasks[task.id] ? "todo" : "completed" } 
                : t
                ));
              setCompletedTasks((prev) => ({
              ...prev,
              [       task.id]: !completedTasks[task.id], 
              }));
              }}
              >
            {completedTasks[task.id] ? "Undo" : "Mark Complete"} {}
          </button>


          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;  

