import React, { useEffect } from "react";
import Post from "./Post";
import useFetchPosts from "../hooks/useFetchPosts";
import useAuthRedirect from "../hooks/useAuthRedirect";
import SuggestedFollowers from "./SuggestedFollowers";

const Posts = () => {
  const { posts, loading } = useFetchPosts();
  const { currentUser } = useAuthRedirect();

  useEffect(() => {
    console.log(currentUser?.uid);
  }, []);

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
      {currentUser?.uid !== "" && (
        <div className="me-5">
          <SuggestedFollowers userId={currentUser?.uid!} />
        </div>
      )}
    </div>
  );
};

export default Posts;
