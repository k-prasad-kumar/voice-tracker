import BoardView from "./components/home/board-view";
import Header from "./components/layout/header";
import { Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/tasks/tasks-list";
import CreateTask from "./components/tasks/create-task";
import { MicIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BoardView />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
      <Link to="/create" className="cursor-pointer hidden md:block">
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center fixed bottom-14 right-14 cursor-pointer hover:shadow-lg hover:bg-blue-700 transition">
          <MicIcon color="white" />
        </div>
      </Link>
      <Toaster />
    </>
  );
}

export default App;
