import React from 'react';
import axios from "axios"
const axiosPublic = axios.create({
    baseURL:'https://server-jade-xi.vercel.app',
    
  });
function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic