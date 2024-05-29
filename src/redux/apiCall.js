import { apiDomain } from "../Utility/Utils";
//import the reducers from slice
import {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserSuccess,
  suggestedSuccess,
  followSuggestedSuccess
} from "./userSlice";
import {
  uploadStart,
  uploadSuccess,
  uploadFail,
  uploadPostSuccess,
  retrievingStart,
  retrievingSuccess,
  retrievingFail,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} from "./postSlice";

import {
  likeStart,
  likeSuccess,
  likeFailure,
  createlikesSuccess,
  dislikeSuccess,
} from "./likeSlice";

import {
  followStart,
  followSuccess,
  followFailure,
  createFollowSuccess,
  unfollowSuccess,
} from "./followSlice";

import {
  commentStart,
  commentSuccess,
  commentFailure,
  createCommentSuccess,
} from "./commentSlice";

import {
  chatStart,
  chatSuccess,
  chatFailure,
  createChatSuccess,
  chatUserSuccess,
  chatUserFailure,
} from "./chatSlice";

import {
  messageStart,
  messageSuccess,
  messageFailure,
  createmessageSuccess,
} from "./messageSlice";


import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// Login user

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const { data } = await axios.post(`${apiDomain}/auth/login`, user);
    if (data.token) {
      dispatch(loginSuccess(data));
      alert("Logged in successfully");
      toast.info(`logged in successfully`, {
        position: "top-center",
      });
    }
  } catch ({ response }) {
    dispatch(loginFailure());
    toast.info(`Invalid Credentials Please input correct credentials`, {
      position: "top-center",
    });
    alert("Invalid Credentials Please input correct credentials");
  }
};
export const logOut = function (dispatch) {
  dispatch(logout());
  alert("logged out successfully");
  toast.info(`logged out successfully`, {
    position: "top-center",
  });
};


export const createPost = async (dispatch, data) => {
  console.log(data, "post info");
  dispatch(uploadStart());
  try {
    const postVal = await axios.post(`${apiDomain}/post`, data);
    console.log(postVal.data.status);
    dispatch(uploadSuccess());
    if (postVal.data.status == "success") {
      alert("Post uploaded successfully");
      toast.info(`Post uploaded successfully`, {
        position: "top-center",
      });
    } else {
      alert("Post not uploaded please try again");
      toast.info(`Post  not uploaded please try again`, {
        position: "top-center",
      });
    }
    dispatch(uploadPostSuccess(data));
  } catch (error) {
    dispatch(uploadFail());
  }
};

// Get posts
export const getPosts = async (dispatch) => {
  dispatch(retrievingStart());
  try {
    const { data } = await axios.get(`${apiDomain}/post`);
    // console.log(data);
    dispatch(retrievingSuccess(data));
  } catch (error) {
    dispatch(retrievingFail(error));
  }
};

// Delete post
export const deletePost = async (id, dispatch, token) => {
  console.log(id, token);
  dispatch(deletePostStart());
  try {
    await axios.post(`${apiDomain}/post/${id}`, token);
    alert("Post deleted successfully");
  } catch (error) {
    dispatch(deletePostFailure(error));
  }
};


// Get user
export const getUser = async (dispatch, id) => {
  try {
    const { data } = await axios.get(`${apiDomain}/user/${id}`);
    // console.log(data);
    dispatch(getUserSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

// update user

export const updateUserProfile = async (dispatch, user, dataVal) => {
  const id = user.id;
  console.log(id, dataVal);
  dispatch(updateUserStart());
  try {
    const { data } = await axios.put(`${apiDomain}/user/${id}`, dataVal);
    console.log(data);
    dispatch(updateUserSuccess(dataVal));
    alert("User updated successfully");
    toast.info(`User updated successfully`, {
      position: "top-center",
    });
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

export const getFollowers = async (dispatch, id) => {
  dispatch(followStart());
  try {
    const { data } = await axios.get(`${apiDomain}/follow/${id}`);
    console.log(data);
    dispatch(followSuccess(data));
  } catch (error) {
    dispatch(followFailure());
  }
};

// follow user
export const followUser = async (dispatch, data) => {
  console.log(data);
  try {
    const follow = await axios.post(`${apiDomain}/follow`, data);
    console.log(follow.data.status);
    if (follow.data.status == "followed") {
      alert("followed");
    } else {
      alert("Something went wrong");
      dispatch(createFollowSuccess(1));
    }
  } catch (error) {
    dispatch(followFailure());
  }
};

export const unfollowuser = async (dispatch, data) => {
  console.log(data);
  try {
    const result = await axios.post(`${apiDomain}/unfollow`, data);
    console.log(result.data.status);
    if (result.data.status == "unfollowed") {
      alert("unfollowed");
    } else {
      alert("Something went wrong");
    }
    dispatch(unfollowSuccess());
  } catch (error) {
    dispatch(followFailure());
  }
};

// Get comments
export const getComments = async (dispatch, postId) => {
  dispatch(commentStart());
  try {
    const { data } = await axios.get(`${apiDomain}/comment/${postId}`);
    console.log(data);
    dispatch(commentSuccess(data));
  } catch (error) {
    dispatch(commentFailure());
  }
};

// Create comments
export const createComment = async (dispatch, data) => {
  console.log(data, "comment info");
  dispatch(commentStart());
  try {
    const dataVal = await axios.post(`${apiDomain}/comment`, data);
    console.log(dataVal.data.status);
    if (dataVal.data.status == "success") {
      toast.success(`Comment uploaded`, {
        position: "top-center",
      });
    } else {
      toast.warning(`comment not uploaded`, {
        position: "top-center",
      });
    }
    dispatch(createCommentSuccess(data));
  } catch (error) {
    dispatch(commentFailure());
  }
};

// create a chat
export const createChat = async (dispatch, data) => {
  console.log(data);
  dispatch(chatStart());
  try {
    const chatVal = await axios.post(`${apiDomain}/chat`, data);
    dispatch(chatSuccess(data));
  } catch (error) {
    dispatch(chatFailure());
  }
};


 export const getChats = async (dispatch,id) =>{
  try{
    const {data} = await axios.get(`${apiDomain}/chat/${id}`)
    // console.log(data);
    dispatch(chatUserSuccess(data));
  }catch(error){
    dispatch(chatFailure(error));
  }
 }

 export const chatUser = async (dispatch, id) => {
  try {
    const { data } = await axios.get(`${apiDomain}/user/${id}`);
    console.log(data.user);
    dispatch(chatUserSuccess(data.user));
  } catch (err) {
    dispatch(chatUserFailure(err));
  }
};


// Find chat by user id
export const findChat = async (dispatch, firstId, secondId) =>{
  try{
    const {data} = await axios.get(`${apiDomain}/chat/${firstId}/${secondId}`);
    console.log(data.user);
    dispatch(chatUserSuccess(data.user));

  } catch(error){
    dispatch(chatUserFailure(error));
  }
}


// get a Message
export const getMessage = async (dispatch, chatId) => {

  try {
    const { data } = await axios.get(`${apiDomain}/message/${chatId}`);
    console.log(data);
    dispatch(messageSuccess(data));
  } catch (err) {
    console.log(err)
    dispatch(messageFailure(err));
  }
};

// Create a message
export const createMessage = async ( dispatch,message) =>{
  console.log(message);
  try{
    const data = await axios.post(`${apiDomain}/message`, message);
    console.log(data);
    dispatch(createmessageSuccess(message));
  } catch(err){
    console.log(error)
    dispatch(messageFailure(err));
    alert("Message not sent");
  }
}

// Add a message 
export const addMessage = async (dispatch, message) =>{
  console.log(message)
  try{
    dispatch(createmessageSuccess(message));
  } catch(err){
    console.log(err);
  }
}

// get likes
export const getLikePost = async (dispatch, id) => {
  dispatch(likeStart());
  try{
    const likes = [];
    const {data} = await axios.get(`${apiDomain}/api/likes/${id}`);
    likes.push(data)
    console.log(likes);
    console.log(data, `number of  post for ${id}`);
    dispatch(likesSuccess(data));
    return { data, likes };
  } catch(error){
    dispatch(likeFailure());
  }
}

// create like
export const createlikepost = async (dispatch, data) => {
  const dataVal = await axios.post(`${apiDomain}/api/likes`, data);
  console.log(dataVal);
  if (dataVal.data.status == "success") {
    toast.success(`Post Liked `, {
      position: "top-center",
    });
    console.log("liked post");
  } else {
    toast.warning(`Post not liked`, {
      position: "top-center",
    });
  }
};

// Unlike a post
export const deletelikepost = async (dispatch, like, id) => {
  console.log(id);
  const { data } = await axios.post(`${apiDomain}/api/likes/${id}`, like);
  // console.log(dataVal);
  if (data.status == "success") {
    toast.success(`Post Unliked `, {
      position: "top-center",
    });
    console.log("liked post");
  } else {
    toast.warning(`Something went wrong`, {
      position: "top-center",
    });
  }
};

export const getSuggested  = async (dispatch, id) =>{
  
  try{
    const {data} = await axios.get(`${apiDomain}/suggested/${id}`);
    // console.log(data);
    dispatch(suggestedSuccess(data));

  } catch(error){
    console.log(error);
  }
}

export const followSuggested = async (dispatch, data, user) => {
  try {
    const dataval = await axios.post(`${apiDomain}/follow`, data);
    console.log(dataval.data.status);
    if (dataval.data.status == "followed") {
      toast.info(`${user.username} followed successfully `, {
        position: "top-center",
      });
    } else {
      toast.warning(`Something went wrong`, {
        position: "top-center",
      });
    }
    dispatch(followSuggestedSuccess(user.id));
  } catch (err) {
    console.log(err);
  }
};
