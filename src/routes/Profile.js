import { auth, db } from "firebase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { query, where, collection, getDocs } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };
  const getMyTweets = async () => {
    const q = await query(
      collection(db, "tweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <>
      <button onClick={onLogOut}>Log Out</button>
    </>
  );
};

export default Profile;
