import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTasks } from "@/hooks/taks-hooks";
import UpdateDialog from "./update-task";
import type { TaskInterface } from "@/lib/interfaces";
import { useState } from "react";
import DeleteTask from "./delete-task";
import Loading from "../layout/loading";
import ErrorLoading from "../layout/error";

const TaskList = () => {
  // const [date, setDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <Loading />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full h-full max-w-7xl mx-auto px-14 pt-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Tasks</CardTitle>
          <CardDescription className="text-lg">
            Manage and track all your ongoing tasks.
          </CardDescription>
          <div className="flex items-center gap-4">
            <p>Filter By: </p>
            <Select onValueChange={(e) => setPriority(e)} value={priority}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(e) => setStatus(e)} value={status}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-slate-600 tracking-wide uppercase min-w-2/4">
                  Task Title
                </TableHead>
                <TableHead className="text-slate-700 tracking-wide uppercase">
                  Priority
                </TableHead>
                <TableHead className="text-slate-700 tracking-wide uppercase">
                  Due Date
                </TableHead>
                <TableHead className="text-slate-700 tracking-wide uppercase">
                  Status
                </TableHead>
                <TableHead className="text-slate-700 tracking-wide uppercase">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task: TaskInterface, index: number) => (
                <TableRow key={index}>
                  <TableCell className="w-2/4 py-5 font-semibold">
                    {task.title}
                  </TableCell>
                  <TableCell className="flex items-center gap-2 py-5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: `var(--${task.priority.toLowerCase()})`,
                      }}
                    ></div>
                    <span>{task.priority}</span>
                  </TableCell>
                  <TableCell className="py-5 text-gray-600">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="py-5">
                    <p
                      className="w-fit py-1 px-4 font-semibold rounded-full tracking-wide"
                      style={{
                        backgroundColor: `var(--${task.status
                          .toLowerCase()
                          .replace(" ", "")}-bg)`,
                        color: `var(--${task.status
                          .toLowerCase()
                          .replace(" ", "")})`,
                      }}
                    >
                      {task.status}
                    </p>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2">
                      <UpdateDialog {...task} />
                      <DeleteTask id={task._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default TaskList;
