// src/components/ProfileButton.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../api/user';
import './profileButton.css'; // style as needed

function ProfileButton() {
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setAvatar(user?.avatar?.url); // Assuming Cloudinary returns url
      } catch (err) {
        console.error("Could not load user avatar");
      }
    };
    fetchUser();
  }, []);

  return (
    <button className="avatar-btn" onClick={() => navigate("/profile")}>
      <img src={avatar || "/default-avatar.png"} alt="Avatar" className="avatar-img" />
    </button>
  );
}

export default ProfileButton;
