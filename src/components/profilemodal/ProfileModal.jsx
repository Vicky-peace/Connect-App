
import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateUserProfile } from '../../redux/apiCall';
import { storage } from '../../firebase';

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user.currentUser?.user);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [cover, setCover] = useState(user.coverPicture);
  const [profile, setProfile] = useState(user.profilePicture);
  const [worksAt, setWorksAt] = useState(`${user.worksAt}`);
  const [livesIn, setLivesIn] = useState(`${user.livesIn}`);
  const [country, setCountry] = useState(`${user.country}`);
  const [relationship, setRelationship] = useState(`${user.relationship}`);
  const [about, setAbout] = useState(`${user.about}`);

  const uploadImage = async (file) => {
    const imageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(imageRef, file);
    const imgUrl = await getDownloadURL(imageRef);
    return imgUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload the cover picture and profile picture files to Firebase Storage
      const coverPictureUrl = await uploadImage(cover);
      const profilePictureUrl = await uploadImage(profile);

      // 2. Update the user data with the new URLs
      updateUserProfile(dispatch, user, {
        coverPicture: coverPictureUrl,
        profilePicture: profilePictureUrl,
        worksAt,
        livesIn,
        country,
        relationship,
        about,
        firstname,
        lastname,
      });

      setModalOpened(false); // Close the modal after successful update
    } catch (error) {
      // Handle any errors that occurred during the upload process
      console.error('Error uploading files to Firebase:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <Modal
      overlaycolor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayopacity={0.55}
      overlayblur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div>
          {/* Add the necessary input fields for First Name and Last Name */}
          <input
            type="text"
            className="infoInput"
            name="FirstName"
            placeholder="First Name..."
            value={user.firstname} // Update this with the appropriate user data
            onChange={(e) => {setFirstname(e.target.value)}}
          />

          <input
            type="text"
            className="infoInput"
            name="LastName"
            placeholder="Last Name..."
            value={user.lastname} // Update this with the appropriate user data
            onChange={(e) => {setLastname(e.target.value)}}
          />
   
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="about"
            placeholder="About user..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAT"
            placeholder="Works at..."
            value={worksAt}
            onChange={(e) => setWorksAt(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIN"
            placeholder="Lives in..."
            value={livesIn}
            onChange={(e) => setLivesIn(e.target.value)}
          />

          <input
            type="text"
            className="infoInput"
            name="Country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Relationship Status"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>

        <div>
          {/* Add the necessary input fields for profile image and cover image here */}
          {/* For example:
          Profile Image */}
          <input type="file" name="profilePicture" onChange={(e) => setProfile(e.target.files[0])} />
          Cover Image
          <input type="file" name="coverPicture" onChange={(e) => setCover(e.target.files[0])} />
         
        </div>

        <button type="submit" className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
