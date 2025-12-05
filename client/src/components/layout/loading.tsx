import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-green-500">
      <Spinner className="size-6 text-green-500" /> Loading...
    </div>
  );
};
export default Loading;
