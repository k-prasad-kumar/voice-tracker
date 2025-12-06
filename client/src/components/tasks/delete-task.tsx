import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteTask } from "@/hooks/taks-hooks";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const DeleteTask = ({ id }: { id: string }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const deleteTask = useDeleteTask();

  const handleDelete = () => {
    deleteTask.mutate(id);
    setOpenDialog(false);
    // after deletion refresh (don't reload the page to reflect changes only refresh data)
    // window.location.reload();
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>
          <div className="p-2 rounded hover:bg-gray-200 cursor-pointer">
            <TrashIcon size={14} />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              task.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              onClick={() => {
                setOpenDialog(false);
              }}
              variant={"secondary"}
              className="px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleDelete}
              className="px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
              Yes, Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default DeleteTask;
