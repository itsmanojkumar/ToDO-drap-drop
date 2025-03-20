import { useState } from "react";

function App() {
  const [task, setTask] = useState<string>("");
  const [todoTasks, setTodoTasks] = useState<string[]>([]);
  const [doneTasks, setDoneTasks] = useState<string[]>([]);

  // Handle input change
  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  // Add task to To-Do list
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === "") return; // Prevent empty tasks

    setTodoTasks((prev) => [...prev, task]);
    setTask(""); // Clear input field
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, task: string) => {
    e.dataTransfer.setData("text/plain", task);
  };

  // Allow dropping
  const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
  };

  // Handle drop into "Done" list
  const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
    const task = e.dataTransfer.getData("text/plain");

    setTodoTasks((prev) => prev.filter((t) => t !== task)); // Remove from To-Do
    setDoneTasks((prev) => [...prev, task]); // Add to Done
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">To-Do List</h1>

      {/* Task Input Form */}
      <form onSubmit={handleAddTask} className="mt-4 space-y-2">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={handleTaskChange}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      {/* To-Do Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Pending</h2>
        <ul className="border p-2 rounded">
          {todoTasks.map((task) => (
            <li
              key={task}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              className="p-2 bg-gray-100 rounded border cursor-grab mt-2"
            >
              {task}
            </li>
          ))}
        </ul>
      </div>

      {/* Done Section (Drop Target) */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Done</h2>
        <ul
          className="border p-4 rounded bg-green-100 min-h-[50px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {doneTasks.length === 0 ? (
            <p className="text-gray-500">Drop tasks here</p>
          ) : (
            doneTasks.map((task) => (
              <li key={task} className="p-2 bg-green-300 rounded border mt-2">
                {task}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
