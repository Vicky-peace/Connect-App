import React, {useEffect} from 'react'
import ProfileImage from '../../images/ProfileImage.jpeg';
import Cover from '../../images/Coverimage.jpg';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUser,getFollowers, followUser, unfollowuser } from '../../redux/apiCall';
import './profileCard.css'

const Profile = () => {
  const id = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const currentuserid = useSelector((state) => state?.user?.user?.data?.id);
const userId = useSelector((state)=>state?.user?.user?.id);
const user = useSelector((state)=>state?.user?.currentUser?.user)
const followers = useSelector((state) => state.follow.follow)
const userid = useSelector((state) => state?.user?.currentUser?.user?.id);
 
// console.log(user, userId)

useEffect(() => {
  getFollowers(dispatch, userid);
}, []);

  const ProfilePage = true;
  return (
    <div className='Profilecard'>
      <div className="profileimages">
        <img src={user?.profilePicture} alt="profile" />
        <img src={user?.coverPicture} alt="coverimageclear
        " />
      </div>

      <div className="profileName">
        <span> {user?.firstname} {user?.lastname}</span>
        <span>@{user?.username}</span>
        <span>{user?.about}</span>
      </div>


      <div className="followstatus">
        <hr />
        <div>
          <div className="follow">
          <span>{followers.length}</span>
            <span>Following</span>
            </div>
             {/* <div className="vertical"></div> */}
             <div className="follow">
            <span>{followers.length}</span>
            <span>Followers</span>
            </div>
             
          {<Profile/> && (
            <>
             <div className="vl"></div>
             <div className="follow">
              {/* <span>3</span>
              <span>Posts</span> */}
             </div>
            </>
          )}
        </div>
        <hr />
      </div>
       {<Profile/> ? '' :
         <span>
         My Profile
        </span>}


     
    </div>
  )
}

export default Profile
