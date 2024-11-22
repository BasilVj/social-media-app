import React, { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../GraphQL/Queries";

export type PostType = {
  description: string;
  imageUrl: string;
  postedTime: string;
  userId: string;
};

const useFetchPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { currentUser } = useAuthContext();
  const userId = currentUser?.uid;
  const { error, loading, data } = useQuery(GET_POSTS, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (data) {
      setPosts(data.getUserPosts);
      console.log(data.getUserPosts);
    }
  }, [data]);

  return {
    posts,
    loading,
  };
};

export default useFetchPosts;
