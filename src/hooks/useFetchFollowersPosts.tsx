import React, { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS_POSTS } from "../GraphQL/Queries";

export type PostType = {
  description: string;
  imageUrl: string;
  postedTime: string;
  userId: string;
  mentions: {
    username: string;
    userId: string;
  }[];
};

const useFetchFollowersPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { currentUser } = useAuthContext();
  const userId = currentUser?.uid;
  const { error, loading, data } = useQuery(GET_FOLLOWERS_POSTS, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    console.log("uid", userId);
    if (data) {
      setPosts(data.getFollowersPosts);
      console.log(data.getFollowersPosts);
    }
  }, [data]);

  return {
    posts,
    loading,
  };
};

export default useFetchFollowersPosts;
