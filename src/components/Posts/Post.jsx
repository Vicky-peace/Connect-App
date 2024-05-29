import React, {useEffect} from 'react'
import { PostsData } from '../../Data/PostsData'
import UserPost from '../UserPost/UserPost'
import {getPosts} from '../../redux/apiCall';
import {useSelector, useDispatch} from 'react-redux';
import './post.css'

const Post = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state?.user?.user);
  const {data} = useSelector((state)=> state?.post?.posts) || {};

  useEffect(() =>{
    getPosts(dispatch);
  }, [dispatch]);
  return (
    <div className='Posts'>
      {
      data?.map((post) => (
         <UserPost key={post.id} post={post}/>
      ))}
    </div>
  )
}

export default Post
