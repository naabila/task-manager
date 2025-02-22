import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Banner from "../assets/banner.jpg"
import { toast } from 'react-toastify'
import { AuthContext } from '../ContextProviders/AuthContextProvider'
function Home() {
  const{user}=useContext(AuthContext);
  return (
   <>
       <div className="min-h-screen h-screen bg-white flex items-center">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Manage work Efficiently.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Plan, Track and Organise your work.
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-8">
              An Intranet platform to Manage projects, organise work and focus on what's important.
            </p>
            {
  user ? (
    <Link to='/addtask'>
      <button className="px-8 py-5 hover:text-[#DD001E] hover:bg-transparent hover:border-2 transition-all hover:border-red-700 rounded-lg text-white bg-[#DD001E]">
        Manage Task
      </button>
    </Link>
  ) : (
    <button onClick={()=>toast.error("Please Login to manage task")} className="px-8 py-5 hover:text-[#DD001E] hover:bg-transparent hover:border-2 transition-all hover:border-red-700 rounded-lg text-white bg-[#DD001E]">
        Manage Task
      </button>
    
  )
}

          </div>
          <div className="flex justify-center">
            <img
              src={Banner} 
              alt="Work Management"
              className="rounded-lg  max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Home