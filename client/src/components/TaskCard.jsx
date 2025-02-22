import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
<FaEdit />

function TaskCard({data,deleteTask}) {
    
  return (
    <>
        <div className='card shadow-lg py-5 px-3'>
           <div className="flex justify-between">
           <div>
                <h3 className='font-bold text-slate-900'>{data.title}</h3>
                <p className='font-semibold text-sm mt-2'>{data.description}</p>
            </div>
            <div className='flex gap-3 text-red-700 text-xl'>
            <MdDeleteOutline onClick={()=>deleteTask(data._id)} />
            <FaEdit />
            </div>
           </div>
        </div>
    </>
  )
}

export default TaskCard