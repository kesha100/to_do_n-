'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
export default function Home() {
  const [tasks, setTasks] = useState([]); // Correct state variable name
  const [taskText, setTaskText] = useState('');

  // useEffect(() => {
  //   const initialTasks = [{ id: 1, text: "Todo Test", completed: false }];
  //   setTasks(initialTasks);
  // }, []);
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if ( storedTasks !== null ) setTasks(JSON.parse(storedTasks));
  }, []);
  
  useEffect(() => {
    console.log('Saving tasks to localStorage:', tasks); 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
  }, [tasks]);
  
  const handleAddTask = () => {
    const newTask = { id: tasks.length + 1, text: taskText, completed: false };
    setTasks([...tasks, newTask]);
    setTaskText(''); // Clear the input after adding the task
  };

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <TaskList 
          tasks={tasks} 
          onToggleTask={handleToggleTask} 
          onDeleteTask={handleDeleteTask} 
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{tasks.filter(task => !task.completed).length} items left</span>
          <button
            onClick={() => setTasks(tasks.filter(task => !task.completed))}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}