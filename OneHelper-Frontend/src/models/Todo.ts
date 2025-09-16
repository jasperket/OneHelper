// This interface represents the structure of a ToDo item, matching the ToDoRequest record from the backend.

export interface ToDoWithId {
  id: number;
  title: string;
  description?: string;
  toDoType: string;
  startTime: string;
  endTime: string;
  priorityLevel: number;
  isCompleted: boolean;
  userId: number;
}

export interface ToDo {
  title: string;
  description?: string;
  toDoType: string;
  startTime: string;
  endTime: string;
  priorityLevel: number;
  isCompleted: boolean;
  userId: number;
}
