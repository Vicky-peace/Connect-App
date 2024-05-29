import React, {useEffect, useState} from 'react';
import './comments.css';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getComments, createComment } from '../../redux/apiCall';


const Comments = ({postId}) => {
    const [description, setdescription] = useState('');
     const dispatch = useDispatch();
     const comments = useSelector((state) => state.comment?.comments);
     const profilePicture = useSelector((state)=> state.user.currentUser?.user?.profilePicture);
     const username = useSelector((state)=>state?.user?.currentUser?.user?.username);
     const userId =  useSelector((state) => state?.user?.currentUser?.user?.id);
     const {post} = useSelector((state) => state.post.posts.data);


      
     
     
     useEffect(() => {
        getComments(dispatch, postId)
     }, []);

     const handleSubmit = (e) => {
        e.preventDefault();
        createComment(dispatch, {description, userId, postId, profilePicture, username })
        setdescription("");
     }
  return (
    <div className='comments-container'>
    <div className='write'>
    <div className='image'>
                    <img src={profilePicture} alt="profile pic" />
                </div>
        <form onSubmit={handleSubmit} className="formcomment">
            <input type="text" placeholder='Say something...' value={description} onChange={(e) => setdescription(e.target.value)} required />
            <button type='submit' className= 'button'>Share</button>
        </form>
    </div>
    {
        comments?.map((comment) => (
            <div className='comment' key={comment.id}>
                <img src={comment.profilePicture} alt='profile pic' />
                <div className='info'>
                    <span>{comment.username}</span>
                    <p>{comment.description}</p>
                </div>
                <span className='date'>
                    {moment(comment.date).fromNow()}
                </span>
            </div>
        ))
    }
</div>
  )
}

export default Comments
