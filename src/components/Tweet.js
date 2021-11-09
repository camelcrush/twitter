import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
