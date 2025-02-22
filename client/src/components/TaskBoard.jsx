import React from 'react'
import Form from './Form'
import TaskColumn from './TaskColumn'
import useAxiosPublic from '../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
function TaskBoard() {
  const axiosPublic=useAxiosPublic();
  const { isLoading, isError, data:tasks, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async()=>{
      const {data}=await axiosPublic.get('/tasks');
      console.log(data);
      return data || [];
    },
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <>
        <div className="container mx-auto">
        <div className='flex justify-center'>
        <h1 className='font-bold text-[#DD001E] text-xl my-5'>Task Management</h1>
        </div>
            <Form />
            <TaskColumn tasks={tasks} />

        </div>
    </>
  )
}

export default TaskBoard