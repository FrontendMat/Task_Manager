import { Button } from "../ui/Button";
import { useModal } from "../hooks/useModal";
import { TaskForm } from "./TaskForm";
import { useCallback, useState, memo } from "react";
import { ITask } from "../types/types";
import { TaskItem } from "./TaksItem";

export const TaskBlock = memo(() => {
  const addModal = useModal();
  const editModal = useModal();
  const [taskData, setTaskData] = useState<ITask[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<ITask>({});

  const onAddNewTask = useCallback(
    (data: ITask) => {
      const newTask = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        status: false,
        file: data.file
      };

      const updatedTasks = [...taskData, newTask];
      setTaskData(updatedTasks);
    },
    [taskData]
  );

  const onEditTask = useCallback(
    (editedTask: ITask) => {
      const updatedTasksData = [
        ...taskData.map((task) =>
          task.id === editedTask.id ? editedTask : task
        ),
      ];
      setTaskData(updatedTasksData);
    },
    [taskData]
  );

  const onDeleteTask = useCallback(
    (id: number) => {
      const updatedTasks = taskData.filter((task) => task.id !== id);
      setTaskData(updatedTasks);
    },
    [taskData]
  );

  const onEditModalOpen = useCallback(
    (task: ITask) => {
      setTaskToEdit(task);
      editModal.onToggleModal();
    },
    [editModal, setTaskToEdit]
  );

  return (
    <div className="w-full max-w-4xl">
      {addModal.isOpen && (
        <TaskForm
          onClose={addModal.onToggleModal}
          formTitle="Add Task"
          successBtnText="Add Task"
          callback={onAddNewTask}
        />
      )}
      {editModal.isOpen && (
        <TaskForm
          data={taskToEdit}
          onClose={editModal.onToggleModal}
          formTitle="Edit Task"
          successBtnText="Save"
          callback={onEditTask}
        />
      )}
      <div className="bg-neutral-50 p-4 border rounded-xl flex items-center justify-between">
        <h1 className="text-violet-700 font-extrabold text-2xl">Task List</h1>
        <Button onClick={addModal.onToggleModal}>Add</Button>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {taskData.length > 0 ? (
          taskData.map((item) => (
            <TaskItem
              key={item.id}
              data={item}
              onDelete={onDeleteTask}
              onEdit={onEditModalOpen}
            />
          ))
        ) : (
          <div className="p-4 bg-neutral-50 border rounded-xl">
            <h1 className="text-red-600 text-xl text-center">Empty List</h1>
          </div>
        )}
      </div>
    </div>
  );
});
