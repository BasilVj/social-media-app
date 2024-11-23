import React, { useEffect } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import UploadPost from "./UploadPost";
import { useUserContext } from "../hooks/useUserContext";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../GraphQL/Queries";
import Posts from "./Posts";
import SuggestedFollowers from "./SuggestedFollowers";
import Loader from "./layout/Loader";

const Feed = () => {
  const { currentUser } = useAuthRedirect();
  const { setLoggedUser, loggedUser } = useUserContext();

  const userId = currentUser?.uid;

  const { error, loading, data } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (data) {
      const filteredData = {
        userId: data.getCurrentUser.userId,
        username: data.getCurrentUser.username,
        profilePic: data.getCurrentUser.profilePic,
        followers: data.getCurrentUser.followers,
      };
      setLoggedUser(filteredData);
    }
  }, [data]);

  return (
    <div className="flex justify-center w-full items-center ">
      <div
        className="flex w-full bg-[#e6f7ff] pt-5 flex-col items-center 
      md:items-end xl:items-center justify-center "
      >
        {!loading ? <UploadPost /> : <Loader />}

        <Posts />
      </div>
    </div>
  );
};

export default Feed;
