import { useCallback, memo } from "react";
import { ITask } from "../types/types";
import { Button } from "../ui/Button";

interface TaskItemProps {
  data: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: number) => void;
}

export const TaskItem = memo((props: TaskItemProps) => {
  const { data, onEdit, onDelete } = props;

  const onTaskDelete = useCallback(() => {
    onDelete(data.id!);
  }, [data, onDelete]);

  const onTaskEdit = useCallback(() => {
    onEdit(data);
  }, [onEdit, data]);

  return (
    <div
      className={`p-4 bg-neutral-50 border border-violet-700 rounded-xl flex items-center justify-between ${
        data.status ? "border-green-600" : "border-red-600"
      } `}
    >
      <div>
        <h1 className="text-violet-700 font-extrabold text-xl">{data.title}</h1>
        <p>{data.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onTaskEdit}>Edit</Button>
        <Button onClick={onTaskDelete} bgColor="bg-red-600">
          Delete
        </Button>
      </div>
    </div>
  );
});
