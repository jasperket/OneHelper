import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { ToDoWithId } from "@/models/Todo";
import { updateToDo } from "@/services/toDoClient";
import { validateToDo } from "@/lib/validation/todoValidation";

interface EditTaskProps {
  task: ToDoWithId;
  onUpdated?: () => void;
  onCancel?: () => void;
}

export default function EditTask({ task, onUpdated, onCancel }: EditTaskProps) {
  const [title, setTitle] = useState(task.title);
  const [type, setType] = useState(task.toDoType);
  const [start, setStart] = useState(
    new Date(task.startTime).toISOString().slice(0, 16),
  );
  const [end, setEnd] = useState(
    new Date(task.endTime).toISOString().slice(0, 16),
  );
  const [description, setDescription] = useState(task.description ?? "");
  const [priority, setPriority] = useState<string>(String(task.priorityLevel));
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    type?: string;
    start?: string;
    end?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateToDo({ title, type, start, end });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    try {
      setBusy(true);
      await updateToDo(task.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        toDoType: type.trim(),
        startTime: new Date(start).toISOString(),
        endTime: new Date(end).toISOString(),
        priorityLevel: Number(priority),
        isCompleted: task.isCompleted,
        userId: task.userId,
      });
      onUpdated?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-gray-200 p-8 text-gray-700"
    >
      <h2 className="text-2xl font-bold">Edit Task</h2>
      <div className="mt-8 space-y-6">
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              className="bg-gray-50"
              id="title"
              name="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title && e.target.value.trim())
                  setErrors((p) => ({ ...p, title: undefined }));
              }}
              required
            />
            {errors.title ? (
              <span className="text-sm text-red-600">{errors.title}</span>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="type">Type *</Label>
            <Input
              className="bg-gray-50"
              id="type"
              name="type"
              type="text"
              placeholder="Enter task type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                if (errors.type && e.target.value.trim())
                  setErrors((p) => ({ ...p, type: undefined }));
              }}
              required
            />
            {errors.type ? (
              <span className="text-sm text-red-600">{errors.type}</span>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority" className="bg-gray-50 text-gray-900">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">Low</SelectItem>
                <SelectItem value="2">Medium</SelectItem>
                <SelectItem value="3">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="start">Start Time *</Label>
            <input
              type="datetime-local"
              className="rounded-lg bg-gray-50 p-1.5"
              id="start"
              name="start"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                if (errors.start)
                  setErrors((p) => ({ ...p, start: undefined }));
              }}
              required
            />
            {errors.start ? (
              <span className="text-sm text-red-600">{errors.start}</span>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="end">End Time *</Label>
            <input
              type="datetime-local"
              className="rounded-lg bg-gray-50 p-1.5"
              id="end"
              name="end"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
                if (errors.end) setErrors((p) => ({ ...p, end: undefined }));
              }}
              required
            />
            {errors.end ? (
              <span className="text-sm text-red-600">{errors.end}</span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="bg-gray-50"
            id="description"
            name="description"
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <Button
          type="submit"
          disabled={busy}
          className="bg-themeGreen flex-1 cursor-pointer hover:bg-green-700"
        >
          Save Changes
        </Button>
        <Button
          type="button"
          disabled={busy}
          className="flex-1 cursor-pointer border-2 border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-gray-50"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
