import type { TaskInterface } from "@/lib/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UpdateDialog from "./update-task";
import DeleteTask from "./delete-task";

const TaskCard = (task: TaskInterface) => {
  return (
    <Card
      className={`w-full hover:shadow-lg transition cursor-pointer border-l-4`}
      style={{
        borderLeftColor: `var(--${task.priority.toLowerCase()})`,
      }}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Priority :{" "}
          <span
            className={`font-semibold`}
            style={{
              color: `var(--${task.priority.toLowerCase()})`,
            }}
          >
            {task.priority}
          </span>
        </p>
        <CardDescription className="flex justify-between items-center">
          <p>
            Due :{" "}
            <span>
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <UpdateDialog {...task} />
            <DeleteTask id={task._id} />
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default TaskCard;
