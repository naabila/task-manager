import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider } from 'firebase/auth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { AuthContext } from '../ContextProviders/AuthContextProvider';

function Header() {
  const{googleLogin,logOutUser,user}=useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate=useNavigate()
  console.log(user)
const axiosPublic=useAxiosPublic();
const handleLoginWithGoogle=()=>{
  googleLogin(googleProvider)
      .then((result) => {
        const newUser={
          name:result.user?.displayName,
          email:result.user?.email,
          photo:result.user?.photoURL,
          
        }
        axiosPublic.post("/users",newUser)
        .then(res=>{
          if(res.data.insertedId){
            toast.success("Logged in successfully with Google");
            
          }
        })
        
        //  navigate(location?.state?location.state:"/")
        navigate('/addtask')
      })
      .catch((err) => {
        toast.error("Error during Google login: " + err.message);
      });
  };

// Logout
const handleLogoutUser = () => {
  logOutUser()
    .then(() => {
      toast.success("Logged out successfully");
      navigate('/');
    })
    .catch((err) => {
      toast.error("Error during logout: " + err.message);
    });
};
  return (
    <div className="navbar lg:px-32 bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       
      </ul>
    </div>
    
    <Link to='/'>
    <button className="btn btn-ghost text-2xl font-bold">Organize<span className='text-[#DD001E]'>Pro</span></button>
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      
    </ul>
  </div>
  <div className="navbar-end">
  {
    user?
    <button onClick={handleLogoutUser} className="px-8 py-3 hover:text-[#DD001E] hover:bg-transparent hover:border-2 transition-all  hover:border-red-700  rounded-lg text-white bg-[#DD001E]">Log out</button>
    :
    <button onClick={handleLoginWithGoogle} className="px-8 py-3 hover:text-[#DD001E] hover:bg-transparent hover:border-2 transition-all  hover:border-red-700  rounded-lg text-white bg-[#DD001E]">Login</button>
  }
  
  </div>
</div>
  )
}


 


export default Header