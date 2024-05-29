import React, { useState, useRef } from 'react';
import ProfileImage from '../../images/ProfileImage.jpeg';
import { BsCardImage, BsPlayBtn } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import { BiCalendar } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../redux/apiCall';

import './postshare.css';

const PostShare = () => {
  const [postFile, setPostFile] = useState(null);
  const [desc, setDescription] = useState('');
  const user = useSelector((state) => state.user.user); // Assuming 'user' is the correct slice name in your Redux store
  const dispatch = useDispatch();
  const imageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setPostFile({
        file: img,
        image: URL.createObjectURL(img)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postFile, desc);

    if (!postFile || !desc) {
      // Handle the case where either file or description is empty
      return;
    }

    const fileName = new Date().getTime() + postFile.file.name;
    const storage = getStorage();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, postFile.file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((image) => {
          console.log('File available at', image);
          const userId = user.id; // Assuming the 'id' property exists in the user object
          const createdAt = new Date().toISOString(); // You need to define createdAt and likes variables
          createPost(dispatch, { userId, image, desc, createdAt});
        });
      }
    );

    setPostFile(null);
    setDescription('');
  };

  return (
    <div className='PostShare'>
      <img src={user.profilePicture} alt="" />
      <div>
        <input type="text" placeholder="What's Happening" value={desc} onChange={(e) => setDescription(e.target.value)} />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
            <BsCardImage />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <BsPlayBtn />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <HiLocationMarker />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <BiCalendar />
            Schedule
          </div>
          <button className='button ps-button' onClick={handleSubmit}>
            Share
          </button>
          <div style={{ display: "none" }}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {postFile && (
          <div className="previewImage">
            <RxCross2 onClick={() => setPostFile(null)} />
            <img src={postFile.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
