import React, { useState } from "react";
import {GrNotification} from "react-icons/gr";
import { AiOutlineMessage } from "react-icons/ai";
import { BsFillFilePersonFill} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import TrendCard from "../Trend/TrendCard";
import ShareModal from "../sharemodal/ShareModal";
import { Link } from "react-router-dom";
import "./rightside.css";

const Rightside = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="rightside">
      <div className="nav_icons">
        <Link to="/">
          {" "}
          <AiFillHome style={{ fontSize: "24px" }} />
        </Link>
        <Link to= '/profile'><BsFillFilePersonFill style={{ fontSize: '24px' }} /></Link>
        <GrNotification style={{ fontSize: "24px" }} />
        <AiOutlineMessage style={{ fontSize: "24px" }} />

        <Link to='/chat'> <AiOutlineMessage style={{ fontSize: "24px" }} /></Link>
       
      </div>

      <TrendCard />

      <button
        className="button right-button"
        onClick={() => setModalOpened(true)}
      >
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default Rightside;
