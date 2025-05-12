import { useState } from "react";

export default function AddTaskModal({ onSave, taskToUpdate, onCloseClick }) {
  // get form data
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavourite: false,
    }
  );

  // handle input change
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    // check tags value
    if (name === "tags") {
      value = value.split(",");
    }

    setTask({
      ...task,
      [name]: value,
    });
  };

  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave(task, isAdd);
  };

  return (
    <>
      <div className="bg-black bg-opacity-20 h-full w-full absolute left-0 top-0 z-10"></div>
      <div className="bg-[#191D26] ">
        <form
          className="mx-auto  w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4  lg:p-11 z-10 absolute top-1/5 left-1/3"
          onSubmit={handleFormSubmit}
        >
          <h2 className="mb-7 text-center text-2xl font-bold text-white lg:mb-9 lg:text-[28px]">
            {isAdd ? " Add New Task" : "Edit Task"}
          </h2>

          <div className="space-y-9 text-white lg:space-y-10">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="title">Title</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="title"
                id="title"
                value={task.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                type="text"
                name="description"
                id="description"
                value={task.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="tags">Tags</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  name="tags"
                  value={task.tags}
                  onChange={handleChange}
                  id="tags"
                />
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="priority">Priority</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="priority"
                  id="priority"
                  value={task.priority}
                  onChange={handleChange}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between lg:mt-8">
            <button
              onClick={onCloseClick}
              className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Close
            </button>

            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              {isAdd ? "Create new Task" : "update Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
