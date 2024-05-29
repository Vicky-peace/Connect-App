
import React, { useState } from "react";

import {BsPencilFill} from 'react-icons/bs'
import ProfileModal from "../profilemodal/ProfileModal";
import { useDispatch,useSelector } from "react-redux";
import { logOut,getUser} from "../../redux/apiCall";

import "./infocard.css";
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user.currentUser?.user);
  
  const handleLogout = () => {
    logOut(dispatch);
    getUser(dispatch)
  };
  return (
    <div className="Infocard">
      <div className="infohead">
        <h4>Your Info</h4>
        <div>
          <BsPencilFill
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
           modalOpened={modalOpened}
           setModalOpened={setModalOpened}/>
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{user?.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{user?.livesIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{user?.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
