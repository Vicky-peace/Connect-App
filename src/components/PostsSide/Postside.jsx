import React from 'react'
import PostShare from '../PostsShare/PostShare';
import Post from '../Posts/Post'
import './postside.css'


const Postside = () => {
  return (
    <div className='PostSide'>
    <PostShare/>
    <Post/>
    </div>
  )
}

export default Postside
