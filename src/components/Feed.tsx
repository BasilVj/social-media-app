import React from "react";
import Post from "./Post";
import SuggestedForYou from "./SuggestedForYou";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Feed = () => {
  const { currentUser } = useAuthRedirect();
  return (
    <div className="flex justify-end min-h-screen pt-9 bg-[#e6f7ff]">
      <div className="me-28">
        <Post />
      </div>
      <div className="me-5">
        <SuggestedForYou />
      </div>
    </div>
  );
};

export default Feed;
