export type ToDoFormValues = {
  title: string;
  type: string;
  start: string;
  end: string;
};

export type ToDoFormErrors = Partial<Record<keyof ToDoFormValues, string>>;

export function validateToDo(values: ToDoFormValues): ToDoFormErrors {
  const errors: ToDoFormErrors = {};
  if (!values.title.trim()) errors.title = "Title is required";
  if (!values.type.trim()) errors.type = "Type is required";
  if (!values.start) errors.start = "Start time is required";
  if (!values.end) errors.end = "End time is required";
  return errors;
}
