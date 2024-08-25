import React from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUsers';
import useGetAllTweets from '../hooks/useGetAllTweets';
import Login from './Login';


const Home = () => {

  // here we call custom hooks
  const id = useSelector((store) => store.user.userId);
  useOtherUsers(id);
  useGetAllTweets(id);


  return (
    <div className='flex justify-between '>


      {
        id ? (<> <LeftSideBar />
          <Outlet />
          <RightSideBar /> </>) : (<Login />)
      }
    </div>
  )
}

export default Home