import React from 'react'
import FollowersCard from '../Followers/FollowersCard'
import InfoCard from '../infocard/InfoCard';
import LogoSearch from '../LogoSearch/Logosearch'

const ProfileLeft = () => {
  return (
    <div className='profileleft'>
      <LogoSearch/>
      <InfoCard/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileLeft
