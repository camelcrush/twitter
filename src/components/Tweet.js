import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "firebase";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await deleteDoc(doc(db, "tweets", `${tweetObj.id}`));
    }
  };
  const toogleEditing = () => setEditing((prev) => !prev);
  const onChage = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, "tweets", `${tweetObj.id}`), {
      text: newTweet,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChage}
              placeholder="Edit your tweet"
              value={newTweet}
              required
            />
            <input type="submit" value="Update" />
          </form>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onClickDelete}>Delete Nweet</button>
              <button onClick={toogleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
