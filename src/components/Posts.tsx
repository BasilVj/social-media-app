import React, { useEffect } from "react";
import Post from "./Post";
import SuggestedForYou from "./SuggestedForYou";
import useFetchPosts from "../hooks/useFetchPosts";

const Posts = () => {
  const { posts, loading } = useFetchPosts();

  return (
    <div className="flex justify-end min-h-screen pt-2 bg-[#e6f7ff]">
      <div className="me-16 mb-3">
        {posts.length > 0 &&
          posts.map((post, index) => (
            <Post
              description={post.description}
              imageUrl={post.imageUrl}
              postedTime={post.postedTime}
              userId={post.userId}
              key={index}
            />
          ))}
      </div>
      <div className="me-5">
        <SuggestedForYou />
      </div>
    </div>
  );
};

export default Posts;
