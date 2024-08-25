import React from 'react'
import Avatar from 'react-avatar'
import { Link, useParams } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import useGetProfile from '../hooks/useGetProfile';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/constant';
import { followingUpdate } from '../redux/userSlice';
import { toggle } from '../redux/tweetSlice';


const Profile = () => {
  const { userId, followinguser } = useSelector(store => store.user);
  const profile = useSelector((store) => store.user.profile)
  const { id } = useParams();
  useGetProfile(id)
  

  const dispatch = useDispatch();

  const followAndUnfollowHandler = async () => {
    //  if()
    if (followinguser?.includes(id)) {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: userId }, { withCredentials: true })
        toast.success(res.data.message);
        dispatch(followingUpdate(id))
        dispatch(toggle())
      } catch (error) {
        console.log("Error following user:", error);
      }
    }
    else {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: userId }, { withCredentials: true })
        toast.success(res.data.message);
        dispatch(followingUpdate(id))
        dispatch(toggle())
      } catch (error) {
        console.log("Error follow user:", error);
      }
    }
  }


  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
      <div>
        <div className='flex items-center py-2'>
          <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
            <IoMdArrowBack size="24px" />
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg'>{profile?.name}</h1>
            <p className='text-gray-500 text-sm'>10 post</p>
          </div>
        </div>
        <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
        <div className='absolute top-48 ml-2 border-4 border-white rounded-full'>
          {/* <Avatar src="https://pbs.twimg.com/profile_images/1737676161612980224/oOJhwfFi_400x400.png" size="120" round={true} /> */}

          <Avatar name={profile?.name} size="120" round={true} />
        </div>
        <div className='text-right m-4  '>
          {
            userId === id ? (<button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>) : (<button  onClick={followAndUnfollowHandler} className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>{followinguser.includes(id) ? "Following" : "Follow"}</button>)
          }


        </div>
        <div className='mx-4 mt-6'>
          <h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p>@{profile?.username}</p>
        </div>
        <div className='m-3 text-sm'>
          <p>🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
        </div>
      </div>
    </div>
  )

}
export default Profile 