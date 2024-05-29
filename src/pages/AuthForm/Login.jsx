import React, {useEffect} from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../redux/apiCall";
import { useNavigate } from "react-router-dom";

import {useDispatch,useSelector} from 'react-redux';
import "./login.css";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});



const Login = () => {
  const user = useSelector((state) => state.user.user?.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const { register, handleSubmit, formState: { errors },reset } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = (data) => {
   
   {
    login(dispatch,data);
   reset();
    user ? <Home/> : <Login/>
   }
  };

  
 

  return (
    <>
      <div className="Auth">
        <div className="a-left">
          <div className="Webname">
            <h1>
              Connect App <BiSolidPhoneCall />
            </h1>
            <h6>Explore the ideas throughout the world</h6>
            <h6>To keep connected with us please log in</h6>
          </div>
        </div>
        <div className="a-right">
          <form className="infoForm authForm" onSubmit={handleSubmit(onSubmit)}>
            <h3>Log In</h3>

            <div>
              <input
                type="text"
                placeholder="Username"
                className="infoInput"
                name="username"
                {...register("username")}
              />
              {errors.username && <p className="error">{errors.username.message}</p>}
            </div>

            <div>
              <input
                type="password"
                className="infoInput"
                placeholder="Password"
                name="password"
                {...register("password")}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <div>
              <span style={{ fontSize: "20px" }}>
                Don't have an account?
                <Link to="/register" style={{ color: "#008080", cursor: "pointer" }}>
                  Register!
                </Link>
              </span>
              <button className="button infoButton" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
