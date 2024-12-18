import React, { useState } from "react";
import Loader from "./layout/Loader";

type AvatarType = {
  url: string;
  width?: string;
  editable?: boolean;
  setProfilePicture?: React.Dispatch<React.SetStateAction<string>>;
};

const Avatar = ({ url, width, editable, setProfilePicture }: AvatarType) => {
  const IMGBB_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
  const [isUploading, setIsUploading] = useState(false);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIsUploading(true);
      const file = e.target.files?.[0];
      const formData = new FormData();
      formData.append("image", file);
      fetch(
        `https://api.imgbb.com/1/upload?key=9a7e20a9f13e2c0a918731d0a1d99864`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data && data.data.url) {
            if (setProfilePicture) {
              setProfilePicture(data.data.url); // This is the direct image URL
              setIsUploading(false);
            }
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

  return (
    <div className={`${width ? width : "w-12"}  relative`}>
      <div className="rounded-full overflow-hidden">
        <img src={url} alt="" className="w-full" />
      </div>
      {isUploading && (
        <div className="absolute inset-0 flex items-center bg-white bg-opacity-50 rounded-full">
          <div className="inline-block mx-auto">
            <Loader />
          </div>
        </div>
      )}
      {editable && (
        <label className="absolute bottom-0 right-0 shadow-md shadow-gray-500 p-2 bg-white rounded-full cursor-pointer">
          <input type="file" className="hidden" onChange={handleChange} />
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
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
        </label>
      )}
    </div>
  );
};

export default Avatar;
