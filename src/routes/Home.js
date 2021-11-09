import { db } from "firebase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={tweet}
          type="text"
          placeholder="What's in your mind?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
};

export default Home;
