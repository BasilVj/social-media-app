import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../GraphQL/Queries";

const useFetchUserById = (userId: string) => {
  const { error, loading, data } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  return { data };
};

export default useFetchUserById;
