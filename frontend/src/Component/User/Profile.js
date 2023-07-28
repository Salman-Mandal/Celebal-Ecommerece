import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // or render a loading/error component
  }

  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </>
  );
};

export default Profile;
