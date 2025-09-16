import apiClient from "./apiClient";
import type { ToDo, ToDoWithId } from "@/models/Todo";

export const getToDos = async (): Promise<ToDoWithId[]> => {
  const response = await apiClient.get<ToDoWithId[]>("/ToDo");
  return response.data;
};

export const createToDo = async (toDo: ToDo): Promise<ToDo> => {
  const response = await apiClient.post<ToDo>("/ToDo", toDo);
  return response.data;
};

export const updateToDo = async (id: number, body: ToDo): Promise<ToDo> => {
  const response = await apiClient.put<ToDo>(`/ToDo/${id}`, body);
  return response.data;
};

export const deleteToDo = async (id: number): Promise<void> => {
  await apiClient.delete(`/ToDo/${id}`);
};
