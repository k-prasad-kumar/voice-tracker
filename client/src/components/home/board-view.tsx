import { useHomeTasks } from "@/hooks/taks-hooks";
import type { TaskInterface } from "@/lib/interfaces";
import Loading from "../layout/loading";
import ErrorLoading from "../layout/error";
import TaskCard from "../tasks/task-card";

const BoardView = () => {
  const { data: tasks, isLoading, error } = useHomeTasks();
  const toDoTasks = tasks?.filter(
    (task: TaskInterface) => task.status === "To Do"
  );
  const inProgressTasks = tasks?.filter(
    (task: TaskInterface) => task.status === "In Progress"
  );
  const doneTasks = tasks?.filter(
    (task: TaskInterface) => task.status === "Done"
  );

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
          <div className="w-full flex flex-col items-center mt-8 h-full gap-4">
            {toDoTasks ? (
              toDoTasks.map((task: TaskInterface, index: number) => (
                <TaskCard key={index} {...task} />
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
              3
            </p>
          </div>
          <div className="w-full flex flex-col items-center mt-8 h-full gap-4">
            {inProgressTasks ? (
              inProgressTasks.map((task: TaskInterface, index: number) => (
                <TaskCard key={index} {...task} />
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
            <h2 className="text-xl font-bold text-slate-700">Done</h2>
            <p className="bg-gray-200 rounded-full py-0 px-2 text-sm font-semibold text-slate-600">
              3
            </p>
          </div>
          <div className="w-full flex flex-col items-center mt-8 h-full gap-4">
            {doneTasks ? (
              doneTasks.map((task: TaskInterface, index: number) => (
                <TaskCard key={index} {...task} />
              ))
            ) : (
              <p>
                No tasks available. Click the microphone button to add new
                tasks.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
export default BoardView;
