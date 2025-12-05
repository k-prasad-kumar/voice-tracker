import { useTasks } from "@/hooks/taks-hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { TaskInterface } from "@/lib/interfaces";
import Loading from "../layout/loading";
import ErrorLoading from "../layout/error";

const BoardView = () => {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <Loading />; // complete it later using spinner
  if (error) return <ErrorLoading />;

  return (
    <main className="w-full h-full px-14 mt-5 flex">
      <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="w-full h-full ">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-700">To Do</h2>
            <p className="bg-gray-200 rounded-full py-0 px-2 text-sm font-semibold text-slate-600">
              3
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center h-full gap-4">
            {tasks ? (
              tasks.map((task: TaskInterface, index: number) => (
                <Card
                  className={`w-full hover:shadow-lg transition cursor-pointer border-l-4`}
                  style={{
                    borderLeftColor: `var(--${task.priority.toLowerCase()})`,
                  }}
                  key={index}
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
                    <CardDescription>
                      <p>
                        Due : <span>{task.dueDate}</span>
                      </p>
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>
                No tasks available. Click the microphone button to add new
                tasks.
              </p>
            )}
          </div>
        </div>
        <div className="w-full h-full ">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-700">In Progress</h2>
            <p className="bg-gray-200 rounded-full py-0 px-2 text-sm font-semibold text-slate-600">
              0
            </p>
          </div>
        </div>
        <div className="w-full h-full ">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-700">Done</h2>
            <p className="bg-gray-200 rounded-full py-0 px-2 text-sm font-semibold text-slate-600">
              0
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default BoardView;
