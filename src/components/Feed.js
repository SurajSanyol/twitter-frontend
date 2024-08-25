import React from 'react'
import CreateTweet from './CreateTweet'
import Tweetpost from './Tweetpost'
import { useSelector } from 'react-redux'



const Feed = () => {
  const {tweets} = useSelector((store)=>store.tweet);
  // const id = useSelector((store) => store.user.userId);
  //  useEffect(() => {
  //  }, [refresh])
  
  
  return (
    <div className='w-[50%] border border-gray-200 overflow-y-scroll h-screen '>
         <div >
              <CreateTweet/>
              
              {
                tweets?.map((tweet)=><Tweetpost key={tweet?._id} singleTweet ={tweet}/>)
              }
              
              
         </div>
    </div>
  )
}

export default Feed