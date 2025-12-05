export interface TaskInterface {
  _id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate: string;
  transcript?: string;
}
