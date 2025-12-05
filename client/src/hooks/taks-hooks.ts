import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate?: Date | null;
  transcript?: string;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // <-- for redirecting

  return useMutation({
    mutationFn: async (newTask: CreateTaskInput) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/tasks/create`,
          newTask
        );
        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // ❗ Forward backend error message to React Query
        throw new Error(err.response?.data?.error || "Unknown error");
      }
    },

    onMutate: () => {
      toast.loading("Creating task...", { id: "create-task" });
    },

    onError: (error) => {
      toast.error(error.message, { id: "create-task" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully!", { id: "create-task" });
      // Redirect after success
      navigate("/");
    },
  });
};

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`);
      return res.data;
    },
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    enabled: !!id, // prevents running without an ID
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`
      );
      return res.data;
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CreateTaskInput }) => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/tasks/${id}/update`,
          data
        );
        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // ❗ Forward backend error message to React Query
        throw new Error(err.response?.data?.error || "Unknown error");
      }
    },

    onMutate: () => {
      toast.loading("Updating task...", { id: "update-task" });
    },

    onError: (error) => {
      toast.error(error.message, { id: "update-task" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated successfully!", { id: "update-task" });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return axios.delete(
          `${import.meta.env.VITE_API_URL}/api/tasks/${id}/delete`
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // ❗ Forward backend error message to React Query
        throw new Error(err.response?.data?.error || "Unknown error");
      }
    },

    onMutate: () => {
      toast.loading("Deleting task...", { id: "delete-task" });
    },

    onError: (error) => {
      toast.error(error.message, { id: "delete-task" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully!", { id: "delete-task" });
    },
  });
};
