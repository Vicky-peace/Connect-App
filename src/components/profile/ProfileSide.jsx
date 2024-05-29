import React from 'react'
import Logosearch from '../LogoSearch/Logosearch'
import ProfileCard from '../profileCard/ProfileCard';
import FollowersCard from '../Followers/FollowersCard'
import './profileSide.css';
const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
       <Logosearch/>
       <ProfileCard/>
       <FollowersCard/>
    </div>
  ) 
}

export default ProfileSide
