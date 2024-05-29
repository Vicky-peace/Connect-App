import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getUser,chatUser} from "../../redux/apiCall";
import { saveUser } from "../../redux/chatSlice";
import { apiDomain } from "../../Utility/Utils";
import axios from 'axios';
const Conversation = ({data,user, members, onlineUsers }) => {
  const [userInfo, setUser] = useState([]);
  const dispatch = useDispatch()

  // const user = useSelector((state) => state?.user.currentUser?.user);

  useEffect(() => {
    const getUserinfo = async () => {
        // console.log(members, user);
        const id = members?.find((id) => id !== user);
        const { data } = await axios.get(`${apiDomain}/user/${id}`);
        setUser(data.user);

    }
    getUserinfo();
}, []);

const onlineStatus = () => {
  const id = members?.find((id) => id !== user);
  // console.log(id);
 
  const online = onlineUsers?.find((user) => user?.id === id)
  return online ? true : false;
}
 
  return (
    <>
    <div className="follower conversation">
      <div>
        {onlineStatus() && <div className="online-dot"></div>}
        <img
          src={userInfo?.profilePicture}
          alt="Profile"
          className="followerImage"
          style={{ width: "50px", height: "50px" }}
        />
        <div className="name" style={{fontSize: '0.8rem'}}>
          <span>{userInfo?.firstname} {userInfo?.lastname}</span>
          <span>{onlineStatus()? "Online" : "Offline"}</span>
        </div>
      </div>
    </div>
    <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
  </>
  );
};

export default Conversation;

