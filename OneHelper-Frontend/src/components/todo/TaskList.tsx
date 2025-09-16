import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { ToDoWithId } from "@/models/Todo";
import { deleteToDo, updateToDo } from "@/services/toDoClient";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface TaskListProps {
  items: ToDoWithId[];
  onRefresh: () => void;
  onEdit: (task: ToDoWithId) => void;
}

export default function TaskList({ items, onRefresh, onEdit }: TaskListProps) {
  const [busyId, setBusyId] = useState<number | null>(null);

  const handleToggleCompleted = async (item: ToDoWithId) => {
    try {
      setBusyId(item.id);
      await updateToDo(item.id, {
        title: item.title,
        description: item.description,
        toDoType: item.toDoType,
        startTime: item.startTime,
        endTime: item.endTime,
        priorityLevel: item.priorityLevel,
        isCompleted: !item.isCompleted,
        userId: item.userId,
      });
      onRefresh();
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setBusyId(id);
      await deleteToDo(id);
      onRefresh();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      {items.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 p-4 text-gray-700"
        >
          <Checkbox
            checked={task.isCompleted}
            onCheckedChange={() => handleToggleCompleted(task)}
            disabled={busyId === task.id}
            className="data-[state=checked]:bg-themeOrange data-[state=checked]: data-[state=checked]:border-themeOrange border-themeOrange"
          />
          <div className="flex-1">
            <p className="text-lg font-bold">{task.title}</p>
            <p className="text-sm">Due: {formatDate(task.endTime)}</p>
            {task.description ? (
              <p className="text-sm text-gray-500">{task.description}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm capitalize">{task.toDoType}</p>
            <Button
              variant="ghost"
              className="cursor-pointer p-2"
              onClick={() => onEdit(task)}
            >
              <Pencil />
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer p-2 text-red-600 hover:text-red-700"
              onClick={() => handleDelete(task.id)}
              disabled={busyId === task.id}
              aria-label="Delete task"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
      {items.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
          No tasks yet.
        </div>
      ) : null}
    </div>
  );
}
