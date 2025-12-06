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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { BanIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

const TaskList = () => {
  const [query, setQuery] = useState("");
  const [search, setSerch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const {
    data: tasks,
    isLoading,
    error,
  } = useTasks({
    query,
    priority,
    status,
    date: date ? date : undefined,
  });

  const handleSearch = () => {
    setQuery(search);
  };

  const resetFilters = () => {
    setQuery("");
    setPriority("");
    setStatus("");
    setDate(undefined);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full h-full max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-14 pt-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-between">
            <h2>My Tasks</h2>
            <span
              className="text-sm font-normal flex gap-1 items-center cursor-pointer hover:underline text-primary"
              onClick={resetFilters}
            >
              <BanIcon size={14} /> Reset Filters
            </span>
          </CardTitle>
          <CardDescription className="text-lg">
            Manage and track all your ongoing tasks.
          </CardDescription>
          <div className="grid grid-cols-1 gap-2 w-full">
            {/* <p>Filter By: </p> */}
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="w-fit">
                  <Button
                    variant="outline"
                    id="date"
                    className="w-fit justify-between font-normal text-slate-500"
                  >
                    {date ? date.toLocaleDateString() : "Select due date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <div className="md:w-fit w-full relative flex items-center">
                <Input
                  value={search}
                  placeholder="Search..."
                  onChange={(e) => setSerch(e.target.value)}
                />
                <SearchIcon
                  size={14}
                  className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {tasks.length > 0 ? (
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
          ) : (
            <div className="w-full flex items-center justify-center p-5">
              No matching tasks found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default TaskList;
