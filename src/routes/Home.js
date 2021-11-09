import { auth, db } from "firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    try {
      await addDoc(collection(db, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: user.uid,
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
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
