import React, { useContext } from 'react'
import { AuthContext } from '../ContextProviders/AuthContextProvider';

import { Navigate, useLocation } from 'react-router-dom';
import Loading from "../components/Loading"

function PrivateRoute({children}) {
    const{user,loading}=useContext(AuthContext);
    const location=useLocation();
if(loading){
    return <Loading></Loading>
}

if(user){
  return children
}

return <Navigate to="/" state={location?.pathname}></Navigate>
  
}

export default PrivateRoute