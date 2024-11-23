import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetchPosts from "../hooks/useFetchPosts";
import useFetchUserById from "../hooks/useFetchUserById";
import Avatar from "./Avatar";
import Post from "./Post";
import { appUser } from "../context/UserContext";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE_PIC_MUTATION } from "../GraphQL/Mutations";

type Profile = {
  userId: string;
};
export default function Profile({ userId }: Profile) {
  const { data, refetch } = useFetchUserById(userId);
  const { posts, loading } = useFetchPosts();
  const [user, setUser] = useState<appUser>();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [updateUserProfilePic, { error }] = useMutation(
    UPDATE_PROFILE_PIC_MUTATION
  );

  const handleProfilePicUpdate = async (profilePic: string) => {
    await updateUserProfilePic({
      variables: {
        userId: userId,
        profilePic: profilePic,
      },
    }).then(async () => {
      const updatedProfile = await refetch();
      setUser(updatedProfile.data.getCurrentUser);
    });
  };

  useEffect(() => {
    if (data) {
      setUser(data.getCurrentUser);
    }
  }, [data]);

  useEffect(() => {
    if (profilePicture !== "") {
      handleProfilePicUpdate(profilePicture);
    }
  }, [profilePicture]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#e6f7ff] pt-5">
      {/* User Profile Card */}
      <div className="bg-white/70 w-[45%] p-3 rounded-lg shadow-md mb-5">
        <div className="flex items-center">
          <Avatar
            setProfilePicture={setProfilePicture}
            editable
            width="w-24"
            url={user?.profilePic ? user.profilePic : ""}
          />

          <div className="ml-3">
            <h1 className="text-xl font-semibold">
              {user?.username || "User"}
            </h1>
            <p className="text-sm text-gray-400">
              <span className="mr-1">{user?.followers?.length || 0}</span>
              <span className="font-semibold">followers</span>
            </p>
          </div>
        </div>
      </div>

      {/* User Posts Card */}
      <div className="flex pt-2 bg-[#e6f7ff]">
        <div className="mb-3">
          {posts.length > 0 ? (
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
            <div className="w-[45vw]">
              <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  You don’t have any Posts
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
