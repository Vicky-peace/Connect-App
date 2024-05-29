import React, { useEffect, useState } from "react";
import { Followers } from "../../Data/FollowersData";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import {
  getFollowers,
  followUser,
  unfollowuser,
  getSuggested,
  followSuggested
} from "../../redux/apiCall";
import "./followersCard.css";

const FollowersCard = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const dispatch = useDispatch();
  const currentuserid = useSelector((state) => state.user?.user?.id);
  const userid = useSelector((state) => state?.user?.currentUser?.user?.id);

  const user = useSelector((state) => state?.user?.currentUser?.user);
  const suggested = useSelector((state) => state?.user?.suggestedUser);
  // console.log(suggested, currentuserid, userid);

  useEffect(() => {
    getSuggested(dispatch, userid);
  }, []);



  return (
    <div className="FollowersCard">
      <h3>Suggested for you  </h3>

      {suggested?.map((user) => {
        return (
          <div key={user.id} className="follower">
            <div>
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="pic"
                  className="followerImage"
                />
              ) : (
                <FaUserCircle />
              )}
              <div className="name">
                <span>
                  {user.firstname} {user.lastname}
                </span>
                <span>@{user.username}</span>
              </div>
            </div>

            {/* <button className='button fc-button'>
                Follow
              </button>  */}
            {/* <button onClick={handleFollow} className="button fc-button">
              {currentuserid == suggested ? "Following" : "Follow"}
            </button> */}
              <button className='button fc-button' onClick={() => followSuggested(dispatch, { followeruserId: userid, followeduserId: user.id }, user)}>Follow</button>
              
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;

