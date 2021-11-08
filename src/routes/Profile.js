import { auth } from "firebase";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOut}>Log Out</button>
    </>
  );
};

export default Profile;
