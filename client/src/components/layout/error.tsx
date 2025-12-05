import { TriangleAlertIcon } from "lucide-react";

const ErrorLoading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-red-500">
      <TriangleAlertIcon /> Error loading tasks!
    </div>
  );
};
export default ErrorLoading;
