import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { registerUser } from "../../redux/apiCall";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {apiDomain} from '../../Utility/Utils'
import "./register.css";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const  Register =() =>{
  // const user = useSelector((state) => state.user.user.status);
  // console.log(user)
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  

  const { register, handleSubmit, formState: { errors },reset } = useForm({
    resolver: yupResolver(schema),
  });
  
  const onSubmit = (data) => {
axios.post(`${apiDomain}/auth/register`,data)
.then((response) =>{
  response.data.message && alert(response.data.message);
  navigate("/login");
  reset();
})
.catch(({ response }) => {
  console.log(response);
  alert(response.data.error);
});
}

  return (
    <div className="Auth">
      <div className="a-left">
        <div className="Webname">
          <h1>
            Connect App <BiSolidPhoneCall />
          </h1>
          <h6>Explore the ideas throughout the world</h6>
          <h6>To keep connected with us please signup</h6>
        </div>
      </div>
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign up</h3>

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              {...register("firstname")}
            />
            {errors.firstname && <p className="error">{errors.firstname.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              {...register("lastname")}
            />
            {errors.lastname && <p className="error">{errors.lastname.message}</p>}
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              {...register("username")}
            />
            {errors.username && <p className="error">{errors.username.message}</p>}
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
              {...register("confirmpass")}
            />
            {errors.confirmpass && <p className="error">{errors.confirmpass.message}</p>}
          </div>

          <div>
            <span style={{ fontSize: "20px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#008080", cursor: "pointer" }}>
                Login!
              </Link>
            </span>
          </div>

          <button className="button infoButton" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
