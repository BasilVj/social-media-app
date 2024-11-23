import { useQuery } from "@apollo/client";
import React from "react";
import { GET_FOLLOWERS } from "../GraphQL/Queries";

const useFetchFollowers = (userId: string) => {
  const { error, loading, data, refetch } = useQuery(GET_FOLLOWERS, {
    variables: { userId },
    skip: !userId,
  });
  return {
    followersData: data,
    followersRefetch: refetch,
    followersLoading: loading,
  };
};

export default useFetchFollowers;
