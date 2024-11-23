import { useEffect, useState } from "react";
import { PostType } from "../hooks/useFetchPosts";
import { formatDistanceToNow } from "date-fns";
import useFetchUserById from "../hooks/useFetchUserById";
import Avatar from "./Avatar";

const Post = ({
  description,
  imageUrl,
  postedTime,
  userId,
  mentions,
}: PostType) => {
  //formatting time for post
  const formattedTime = formatDistanceToNow(new Date(postedTime), {
    addSuffix: true,
  });

  const [username, setUsername] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");

  const { data } = useFetchUserById(userId);

  useEffect(() => {
    if (data) {
      setUsername(data.getCurrentUser.username);
      setProfilePic(data.getCurrentUser?.profilePic);
    }
  }, [data]);

  return (
    <div className="bg-white/70 p-8 rounded-lg shadow-md w-[95%] xl:w-[45vw] h-[408px] mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 justify-center">
          <Avatar url={profilePic} />
          <div className="ps-1">
            <p className="text-gray-800 font-semibold">{username}</p>
            <p className="text-gray-500 text-sm">
              {formattedTime.replace("about", "")}
            </p>
          </div>
        </div>
        <div className="text-gray-500 cursor-pointer">
          <button className="hover:bg-gray-50 rounded-full p-1"></button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800">{description}</p>
      </div>
      <div className="mb-4">
        {mentions &&
          mentions.length > 0 &&
          mentions.map((mention) => (
            <p className="text-blue-600 inline pe-1">{mention.username}</p>
          ))}
      </div>

      <div className="mb-4">
        <img
          src={imageUrl}
          alt="Post Image"
          className="w-full h-48 object-cover rounded-md xl:object-fill"
        />
      </div>
    </div>
  );
};

export default Post;
