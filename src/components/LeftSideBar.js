import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getAllTweets } from '../redux/tweetSlice';
import { addprofile, getFollowingUser, getOtherUser,  setUserId, setUserName } from '../redux/userSlice';



const LeftSideBar = () => {

    const id = useSelector((store) => store.user.userId)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutHandler= async()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
            toast.success(res.data.message)
            navigate("/login")
            dispatch(setUserId(null))
            dispatch(setUserName(null))
            dispatch(getAllTweets(null))
            dispatch(getFollowingUser(null))
            dispatch(getOtherUser(null))
            dispatch(addprofile(null))


        } catch (error) {
            console.log("Error loging out",error);
            toast.error("User can't log out");
            
        }
      }
    
    //  useEffect(()=>{
    //     logOutHandler();
    //  },[])
    
    return (
        <div className='w-[20%]'>
            <div className='ml-3'>
                <img className=' w-[40px]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpevfm2P0BtgC9LbXH1n2Xp-oR-iLX8xQTBg&s' alt='twitter-logo' />

                {/* <RiTwitterXFill className=' w-[40px]' /> */}
            </div>

            <Link to={"/"} className='flex  cursor-pointer   rounded-full mt-3 px-4 py-2  items-baseline gap-x-2 hover:bg-gray-300 w-[80%]'>
                <div className='w-[20px]' >
                    <IoHomeOutline />
                </div>
                <h className='font-normal '>Home</h>
            </Link>

            <div className='flex w-[80%] cursor-pointer   rounded-full  px-4 py-2 items-baseline gap-x-2 hover:bg-gray-300'>
                <div className='w-[20px]' >
                    <IoIosSearch />
                </div>
                <h className='font-normal '>Explore</h>
            </div>

            <div className='flex w-[80%] cursor-pointer   rounded-full  px-4 py-2 items-baseline gap-x-2 hover:bg-gray-300'>
                <div className='w-[20px]' >
                    <IoMdNotificationsOutline />
                </div>
                <h className='font-normal '>Notification</h>
            </div>

            <Link to={`/profile/${id}`} className='flex w-[80%] cursor-pointer   rounded-full  px-4 py-2 items-baseline gap-x-2 hover:bg-gray-300'>
                <div className='w-[20px]' >
                    <FiUser />
                </div>
                <h className='font-normal '>Profile</h>
            </Link>

            <div className='flex w-[80%] cursor-pointer   rounded-full  px-4 py-2 items-baseline gap-x-2 hover:bg-gray-300'>
                <div className='w-[20px]' >
                    <IoBookmarkOutline />
                </div>
                <h className='font-normal '>Bookmarks</h>
            </div>

            <div onClick={logOutHandler} className='flex w-[80%] cursor-pointer   rounded-full  px-4 py-2 items-baseline gap-x-2 hover:bg-gray-300'>
                <div className='w-[20px]' >
                    <AiOutlineLogout />
                </div>
                <h className='font-normal '>Logout</h>
            </div>

            <button className='w-[80%] mt-2 bg-[#1D9BF0] rounded-full  px-7  py-2 text-white'>Post</button>
        </div>
    )
}

export default LeftSideBar