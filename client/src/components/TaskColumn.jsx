import React from 'react'
import TaskCard from './TaskCard'
import { Link } from 'react-router-dom'

function TaskColumn({tasks,deleteTask}) {
  console.log("tasks in column",tasks)
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl p-5">
      {
        tasks.map(task=>{
          return(
            <TaskCard key={task._id} data={task} deleteTask={deleteTask} />
          )
        })
      }
      
      </div>
      <Link to='/addtask'>
      <h1 className="font-bold text-[#DD001E] my-5">Add More</h1>

      </Link>
    </>
  )
}

export default TaskColumn