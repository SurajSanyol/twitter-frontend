import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";



const useGetAllTweets = (id) => {
     const {refresh,isActive} = useSelector(store=>store.tweet)
      const dispatch = useDispatch();
     const fetchAllTweets = async ()=>{
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/alltweet/${id}`,{withCredentials:true})
            // console.log(res);
           dispatch(getAllTweets(res?.data?.tweets));
          
       } catch (error) {
          console.error("Error fetching allTweets data:", error);
       }
     }

     const fetchFollowingTweets = async ()=>{
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweet/${id}`,{withCredentials:true})
            // console.log(res);
           dispatch(getAllTweets(res?.data?.tweets));
          
       } catch (error) {
          console.error("Error fetching followingTweets data:", error);
       }
     }
   

     useEffect(()=>{
        if(isActive){

           fetchAllTweets();
        }
        else{

           fetchFollowingTweets();
        }
     },[isActive,refresh])


}

export default useGetAllTweets