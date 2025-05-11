import { useState } from "react";

// components
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

import AddTaskModal from "./AddTaskModal";

export default function TaskBoard() {
  // default task
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React By Goutam",
    description: "This is sample description in our react project",
    tags: ["php", "react", "laravel"],
    priority: "High",
    isFavourite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  // handle add task
  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }

          return task;
        })
      );
    }
    setShowAddModal(false);
  }

  // hamdle edit task
  function HandleTaskEdit(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  // handle close click
  function onCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  // handle task delete
  function handleTaskDelete(delTask) {
    const updateTask = tasks.filter((task) => task.id !== delTask.id);

    setTasks(updateTask);
  }

  // handle all task delete
  function handleDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  // handle task favourite
  function handleFavouriteTask(taskId) {
    const TaskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTask = [...tasks];

    newTask[TaskIndex].isFavourite = !newTask[TaskIndex].isFavourite;

    setTasks(newTask);
  }

  return (
    <>
      {/* Begin Table */}
      <section className="pb-20 text-white px-6 !bg-[#191D26]" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={handleAddEditTask}
            taskToUpdate={taskToUpdate}
            onCloseClick={onCloseClick}
          />
        )}

        <div className="container">
          {/* Search Box */}
          <div className="p-2 flex justify-end">
            <SearchTask />
          </div>
          {/* Search Box Ends */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions
              onAddClick={() => setShowAddModal(true)}
              onDeleteAllClick={handleDeleteAllClick}
            />

            <TaskList
              tasks={tasks}
              onEdit={HandleTaskEdit}
              onDelete={handleTaskDelete}
              onFav={handleFavouriteTask}
            />
          </div>
        </div>
      </section>
    </>
  );
}
