import React, { useState } from 'react'
import useAxiosPublic from "../hooks/useAxiosPublic";
import {toast} from "react-toastify"
function Form() {
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState("");
    const [category, setCategory] = useState("To-Do");
    const axiosPublic=useAxiosPublic()
    // Handle task submit
    const handleTaskSubmit=async(e)=>{
        e.preventDefault();
        const tasks={title,description,category};
        console.log(tasks);
       //post task to database
       try{
        const {data}=await axiosPublic.post('/tasks',tasks);
        setDescription("");
        setTitle("")
        toast("task added successfully")
        return data;
       }catch(err){
        toast.error(err)
       }

    }
  
  return (
    <>
    <form onSubmit={handleTaskSubmit} className="mb-4 p-4 bg-white shadow-md rounded-lg flex flex-col gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title (max 50 chars)"
        maxLength="50"
        required
        className="input input-bordered w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional, max 200 chars)"
        maxLength="200"
        className="textarea textarea-bordered w-full"
      />
       <select
        className="select select-bordered w-full w-full"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" className="py-3 hover:text-[#DD001E] hover:bg-transparent hover:border-2 transition-all  hover:border-red-500  rounded-lg text-white bg-[#DD001E] w-full">Add Task</button>
    </form>
    </>
  )
}

export default Form