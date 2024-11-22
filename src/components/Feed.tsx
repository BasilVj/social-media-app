import React, { useEffect } from "react";
import Post from "./Post";
import SuggestedForYou from "./SuggestedForYou";
import useAuthRedirect from "../hooks/useAuthRedirect";
import UploadPost from "./UploadPost";
import { useUserContext } from "../hooks/useUserContext";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

const Feed = () => {
  const { currentUser } = useAuthRedirect();
  const { setLoggedUser, loggedUser } = useUserContext();

 

  useEffect(() => {
    if (currentUser) {
      setLoggedUser({
        userId: currentUser.uid,
        username: loggedUser?.username!,
        profilePic: loggedUser?.profilePic!,
        followers: loggedUser?.followers ? loggedUser.followers : null,
      });
    }
  }, []);

  return (
    <div>
      <div className="flex justify-center bg-[#e6f7ff] pt-5">
        <UploadPost />
      </div>
      <div className="flex justify-end min-h-screen pt-2 bg-[#e6f7ff]">
        <div className="me-16">
          <Post />
        </div>
        <div className="me-5">
          <SuggestedForYou />
        </div>
      </div>
    </div>
  );
};

export default Feed;
