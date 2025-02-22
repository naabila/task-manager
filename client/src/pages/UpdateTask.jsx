import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';

function UpdateTask() {
  const navigate=useNavigate();
  const{id}=useParams();
  const axiosPublic=useAxiosPublic();
   // Fetch tasks
   const {
    isLoading,
    isError,
    data: task,
    error
  } = useQuery({
    queryKey: ["task",id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task/${id}`);
      console.log("Fetched tasks for updata:", data);
      return data || [];
    },
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  //task updating
  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    const updatedTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
    };
   
try {
      const { data } = await axiosPublic.put(`/tasks/${id}`, updatedTask);
      toast.success("Task Updated Successfully");
      console.log("Updated task:", data);
      navigate('/taskboard')
    } catch (err) {
      toast.error("Error Updating Task");
      console.error(err);
    }
  };



  return (
    <>
    <div className="container mx-auto">
    <div className="flex justify-center">
        <h1 className="font-bold text-[#DD001E] text-xl my-5">Update Task</h1>
      </div>
    <form onSubmit={handleTaskUpdate} className="mb-4 p-4 bg-white shadow-md rounded-lg flex flex-col gap-2">
      <input
        type="text"
        name="title"
        defaultValue={task?.title}
        placeholder="Task Title (max 50 chars)"
        maxLength="50"
        required
        className="input input-bordered w-full"
      />
      <textarea
       defaultValue={task?.description}
        placeholder="Description (optional, max 200 chars)"
        maxLength="200"
        name="description"
        className="textarea textarea-bordered w-full"
      />
       <select
        className="select select-bordered w-full"
        defaultValue={task?.category}
        name="category"
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" className="py-3 hover:text-[#DD001E] hover:bg-transparent hover:border-2 transition-all  hover:border-red-500  rounded-lg text-white bg-[#DD001E] w-full">Add Task</button>
    </form>
    </div>
    </>
  )
}

export default UpdateTask