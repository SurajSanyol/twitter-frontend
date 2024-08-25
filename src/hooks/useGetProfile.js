import axios from "axios";
import { useEffect } from "react"
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addprofile } from "../redux/userSlice";


const useGetProfile = (id) => {

    const dispatch = useDispatch();
 



    const getProfile = async () => {
        try {
            const fetchData = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{withCredentials:true});
            dispatch(addprofile(fetchData?.data?.user));
            
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }

    }

    useEffect(() => {
        if (id) {
             getProfile();
        }
    }, [id])


}

export default useGetProfile;


