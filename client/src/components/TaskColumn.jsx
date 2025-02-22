import React from 'react'
import TaskCard from './TaskCard'

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
    </>
  )
}

export default TaskColumn