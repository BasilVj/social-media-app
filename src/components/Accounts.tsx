import React from "react";
import { appUser } from "../context/UserContext";
import Avatar from "./Avatar";
import { useMutation } from "@apollo/client";
import { ADD_FOLLOWSER_MUTATION } from "../GraphQL/Mutations";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetchSuggestedUsers from "../hooks/useFetchSuggestedUsers";
import { useUserContext } from "../hooks/useUserContext";

type Accounts = {
  user: appUser;
  setSuggestedUsers: React.Dispatch<
    React.SetStateAction<appUser[] | undefined>
  >;
  currentUserId: string;
};

const Accounts = ({ user, setSuggestedUsers, currentUserId }: Accounts) => {
  const [addFollower, { error, loading }] = useMutation(ADD_FOLLOWSER_MUTATION);
  const { data, refetch } = useFetchSuggestedUsers(currentUserId);

  const { currentUser } = useAuthContext();
  const handleFollowUser = async () => {
    try {
      await addFollower({
        variables: {
          currentUserId: currentUser?.uid,
          followerId: user.userId,
          followerUsername: user.username,
        },
      }).then(async () => {
        console.log("Success");
        const updatedData = await refetch();
        setSuggestedUsers(updatedData.data.getSuggestUsers);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center bg-[#e6f7ff] text-white p-4">
      <Avatar url={user.profilePic} />
      <div className="ml-4 flex flex-col pe-2">
        <h3 className="text-lg font-normal text-black">{user.username}</h3>
        <p className="text-sm text-gray-400">
          {user.followers?.length}{" "}
          <span className="font-semibold">followers</span>
        </p>
      </div>

      {/* Follow Button */}
      <button
        className="ml-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  );
};

export default Accounts;
