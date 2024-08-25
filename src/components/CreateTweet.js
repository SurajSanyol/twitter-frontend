import React, { useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import Avatar from 'react-avatar';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { isActiveHandler, toggle } from '../redux/tweetSlice';


const CreateTweet = () => {
  const dispatch = useDispatch();
  const id = useSelector((store) => store.user.userId);
  const { isActive } = useSelector(store => store.tweet)
  const {userName} = useSelector((store) => store.user)
  const input = useRef(null);
  const [file, setFile] = useState(null);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (file) {
      formData.append('imageupload', file);
    }
    formData.append("id", id);
    formData.append("description", input.current.value);


    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/createtweet`, formData, { withCredentials: true });
      
      if (res.data.success) {
        toast.success(res.data.message);
      }

      input.current.value = "";
      setFile(null);
      dispatch(toggle());
      
      // dispatch(toggle());
     


    } catch (error) {
      console.log("Error creating tweet:", error);
      toast.error("Error creating tweet");
    }
  }
   
  
  
  const forYouHandler = () => {
    dispatch(isActiveHandler(true))
  }

  const followingHandler = () => {
    dispatch(isActiveHandler(false))
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  return (
    <div>

      <div className='flex flex-row  w-[100%] border border-b-gray-200'>
        <div onClick={forYouHandler} className={`  text-gray-600 cursor-pointer   w-[50%] flex ${isActive && " bg-gray-200 font-semibold  "} `}>
          <h1 className={` mx-auto px-4 py-3 ${isActive && " border-b-4 border-blue-600  "} `} >For you</h1>
        </div>
        <div onClick={followingHandler} className={`  text-gray-600 cursor-pointer   w-[50%] flex ${!isActive && " bg-gray-200 font-semibold  "} `}>
          <h1 className={` mx-auto px-4 py-3 ${!isActive && " border-b-4 border-blue-600  "} `}> Following</h1>
        </div>
      </div>

      <div className=' flex flex-row p-4 border border-b-gray-200'>
        {/* <Avatar src='https://pbs.twimg.com/profile_images/1737676161612980224/oOJhwfFi_400x400.png' size="50" round={true} /> */}

        <Avatar name={userName} size="50" round={true} />

        <div className='  w-[80%]  '>


          <input ref={input} className='  outline-none border-none px-4 h-11 text-xl w-[100%] ' type='area' placeholder='What is happening?!' />
          <div className='flex justify-between px-4 mt-3 '>
            {/* <label htmlFor='file-upload' className='cursor-pointer'>
                <CiImageOn className='text-[#1D9BF0]' />
                <input id='file-upload' type='file' className='hidden' onChange={handleFileChange} />
              </label> */}

            <form onSubmit={onSubmitHandler}  enctype="multipart/form-data" className='w-[100%]'>
              <label htmlFor='file-upload' className='cursor-pointer flex justify-between px-4 mt-3 '>
                <CiImageOn className='text-[#1D9BF0]' />
                <input  id='file-upload'  type='file' name='imageupload' className='hidden'  onChange={handleFileChange} />
                <button  type='submit' className='  bg-[#1D9BF0] rounded-full  px-7  py-2 text-white'> Post</button>
              </label>
              {/* <input  type='file' name='imageupload'  onChange={handleFileChange} />
              <button  type='submit' className='  bg-[#1D9BF0] rounded-full  px-7  py-2 text-white'> Post</button> */}
            </form>

          </div>

        </div>


      </div>
    </div>
  )
}

export default CreateTweet