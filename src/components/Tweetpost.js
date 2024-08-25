import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoBookmarkOutline } from 'react-icons/io5';
import axios from 'axios';
import { parseTwitterDate, TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { toggle } from '../redux/tweetSlice';
import { MdDeleteOutline } from "react-icons/md";
import { FcLike } from "react-icons/fc";


const Tweetpost = ({ singleTweet }) => {
  const { userId } = useSelector(store => store.user)
  const dispatch = useDispatch();

  const likeAndDislikeHandler = async (id) => {
    try {
      const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: userId }, { withCredentials: true });
      toast.success(res.data.message);
      dispatch(toggle());

    } catch (error) {
      console.log("Error liking tweet:", error);
      toast.error("Error liking tweet");
    }
  }

  const deleteTweethandler = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/deletetweet/${id}`, { withCredentials: true })
      toast.success(res.data.message);
      dispatch(toggle());
    } catch (error) {
      console.log("Error deleting tweet:", error);
      toast.error("Error deleting tweet");
    }
  }
   
 
 
  return (
    <div className='border-b border-gray-200' >

      <div className='flex p-4' >
        {/* <Avatar src="https://pbs.twimg.com/profile_images/1737676161612980224/oOJhwfFi_400x400.png" size="50" round={true} /> */}
        <Avatar name={singleTweet?.userDetails[0]?.name} size="50" round={true} />
        <div className=' px-4 w-[80%]'>

          <div className='flex justify-between'>
            <div className='flex items-center'>

              <h1 className='font-bold'>{singleTweet?.userDetails[0]?.name}</h1>
              <p className='text-gray-500 text-sm ml-1'>@{singleTweet?.userDetails[0]?.username}</p>
              <p className='text-gray-500 text-sm ml-3'>{parseTwitterDate(singleTweet?.createdAt)}</p>
            </div>


            <>

              {
                userId === singleTweet?.userId && (
                  <div onClick={() => deleteTweethandler(singleTweet?._id)} className='flex items-center'>
                    <div className='p-2 hover:bg-red-400 rounded-full cursor-pointer'>
                      <MdDeleteOutline size="24px" />
                    </div>
                  </div>
                )
              }

            </>

          </div>

          <div>
            <p> {singleTweet?.description}</p>
          </div>

            {/* yaha pr image add krenge  */}
            {
              singleTweet?.imageUrl && (
                <div className='my-3 '>
                  <img className='rounded-md' src={singleTweet?.imageUrl} alt="tweet"  loading='lazy'/>
                </div>
              )
            }

          <div className='flex justify-between my-3'>
            <div className='flex items-center'>
              <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                <FaRegComment size="20px" />
              </div>
              <p>0</p>
            </div>
            <div className='flex items-center'>
              <div onClick={() => likeAndDislikeHandler(singleTweet?._id)} className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
              {
                singleTweet?.like?.includes(userId) ? <FcLike  size="24px"  /> : <CiHeart size="24px" />
              }
                {/* <CiHeart size="24px" /> */}

              </div>
              <p>{singleTweet?.like?.length}</p>
            </div>
            <div className='flex items-center'>
              <div className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>

                <IoBookmarkOutline size="24px" />

              </div>
              <p>0</p>
            </div>


          </div>
        </div>

      </div>
    </div>
  )
}

export default Tweetpost