import React from 'react';
import ProfileLeft from '../../components/profileleft/ProfileLeft';
import ProfileCard from '../../components/profileCard/ProfileCard'
import Postside from '../../components/PostsSide/Postside';
import Rightside from '../../components/Rightpart/Rightside'
import './profile.css';

const Profile = () => {
  return (
    <div className='Profile'>
      <ProfileLeft/>

      <div className="Profile-center">
        <ProfileCard/>
        <Postside/>
        
      </div>
      <Rightside/>
    </div>
  )
}

export default Profile
