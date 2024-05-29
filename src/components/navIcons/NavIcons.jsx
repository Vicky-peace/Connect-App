import React from "react";

import {GrNotification} from "react-icons/gr";
import { AiOutlineMessage } from "react-icons/ai";
import { BsFillFilePersonFill} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="nav_icons">
    <Link to="/">
      {" "}
      <AiFillHome style={{ fontSize: "24px" }} />
    </Link>
    <Link to= '/profile'><BsFillFilePersonFill style={{ fontSize: '24px' }} /></Link>
    <GrNotification style={{ fontSize: "24px" }} />

    <Link to='/chat'> <AiOutlineMessage style={{ fontSize: "24px" }} /></Link>
   
  </div>
  );
};

export default NavIcons;
