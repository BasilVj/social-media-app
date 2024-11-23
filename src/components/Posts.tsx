import React, { useEffect } from "react";
import Post from "./Post";
import useAuthRedirect from "../hooks/useAuthRedirect";
import SuggestedFollowers from "./SuggestedFollowers";
import useFetchFollowersPosts from "../hooks/useFetchFollowersPosts";
import Loader from "./layout/Loader";

const Posts = () => {
  const { posts, loading } = useFetchFollowersPosts();

  return (
    <div
      className={`min-h-screen pt-2 bg-[#e6f7ff] ps-5 md:ps-0 md:w-[60%] xl:w-auto ${
        loading ? "flex justify-center items-center" : ""
      }`}
    >
      {!loading ? (
        <div className="mb-3">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <Post
                description={post.description}
                imageUrl={post.imageUrl}
                postedTime={post.postedTime}
                userId={post.userId}
                key={index}
              />
            ))
          ) : (
            <div className="w-[95%] xl:w-[45vw]">
              <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  You don’t have any Followers
                </h1>
                <h2 className="text-gray-600 mb-6">
                  Start adding friends to your network to view their posts
                </h2>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Posts;
