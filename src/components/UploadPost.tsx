import React, { useState } from "react";
import Loader from "./layout/Loader";
import { useUserContext } from "../hooks/useUserContext";
import Avatar from "./Avatar";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "../GraphQL/Mutations";

const UploadPost = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState("");
  const { loggedUser } = useUserContext();

  const [createUser, { error, loading }] = useMutation(CREATE_POST_MUTATION);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIsUploading(true);
      const file = e.target.files?.[0];
      const formData = new FormData();
      formData.append("image", file);

      fetch(
        "https://api.imgbb.com/1/upload?key=9a7e20a9f13e2c0a918731d0a1d99864",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data && data.data.url) {
            setImage(data.data.url); // This is the direct image URL
            setIsUploading(false);
          } else {
            console.error("Error: Unable to get image URL");
            setIsUploading(false);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setIsUploading(false);
        });
    }
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image == "") {
      return alert("Please upload a image while posting");
    }

    try {
      await createUser({
        variables: {
          userId: loggedUser?.userId,
          description: description,
          imageUrl: image,
        },
      }).then(() => {
        setDescription("");
        setImage("");
      });
    } catch (error) {
      console.log(error);
    }

    e.preventDefault();
  };

  return (
    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-5 w-[45.5%] me-[4rem]">
      <form onSubmit={handleCreatePost}>
        <div className="flex gap-2">
          <div>
            <Avatar url={loggedUser?.profilePic ? loggedUser.profilePic : ""} />
          </div>
          {/*  {profile && ( */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="grow p-3 h-14"
            required
            placeholder={`Whats on your mind, ${loggedUser?.username}?`}
          />
          {/* )} */}
        </div>
        {isUploading && (
          <div>
            <Loader />
          </div>
        )}
        {image !== "" && (
          <div className="mt-2">
            <img src={image} alt="" className="w-auto h-24 rounded-md" />
          </div>
        )}
        <div className="flex gap-5 items-center mt-2">
          <div>
            <label className="flex gap-1">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="hidden md:block">Photos</span>
            </label>
          </div>
          <div>
            <button className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="hidden md:block">People</span>
            </button>
          </div>
          <div className="grow text-right">
            <button
              disabled={loading}
              /* onClick={createPost} */
              type="submit"
              className="bg-socialBlue text-white px-6 py-1 rounded-md"
            >
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadPost;
