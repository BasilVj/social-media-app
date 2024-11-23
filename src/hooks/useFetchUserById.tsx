import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../GraphQL/Queries";

const useFetchUserById = (userId: string) => {
  const { error, loading, data, refetch } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  return { data, refetch };
};

export default useFetchUserById;
