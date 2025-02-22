import React from "react";
import Form from "./Form";
import { toast } from "react-toastify";
import TaskColumn from "./TaskColumn";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

function TaskBoard() {
  const axiosPublic = useAxiosPublic();

  // Fetch tasks
  const {
    isLoading,
    isError,
    data: tasks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/tasks");
      console.log("Fetched tasks:", data);
      return data || [];
    },
  });

  // Handle delete
  const deleteTask = async (id) => {
    try {
      const { data } = await axiosPublic.delete(`/tasks/${id}`);

      if (data?.deletedCount > 0) {
        toast.success("Task deleted successfully");
        refetch();
      } else {
        toast.error(data?.message || "Could not delete the task");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting task");
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <h1 className="font-bold text-[#DD001E] text-xl my-5">Task Management</h1>
      </div>
      
      <TaskColumn deleteTask={deleteTask} tasks={tasks} />
    </div>
  );
}

export default TaskBoard;
