import React from 'react'
import PostSide from '../../components/PostsSide/Postside'
import ProfileSide from '../../components/profile/ProfileSide'
import RightSide from '../../components/Rightpart/Rightside'
import './Home.css'
const Home = () => {
  return (
    <div className="Home">
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
    </div>
  )
}

export default Home