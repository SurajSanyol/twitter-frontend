


import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUser } from '../redux/userSlice';

const useOtherUsers = (id) => {

    const dispatch = useDispatch();
    const otheruser = useSelector((store)=>store.user.otherUser);
     
  
     const getOtherUsers = async ()=>{
         try {
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`,{withCredentials:true})
                 dispatch(getOtherUser(res?.data?.otherUser))
               
         } catch (error) {
            console.error("Error fetching otherUsers data:", error);

         }
     }
    
     useEffect(()=>{
       !otheruser &&  getOtherUsers();
     },[id])
  
}

export default useOtherUsers