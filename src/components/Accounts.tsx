import React from "react";

const Accounts = () => {
  return (
    <div className="flex items-center bg-[#e6f7ff] text-white p-4 w-[300px]">
      {/* Instagram Logo */}
      <div className="flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.25c1.62 0 3.164.312 4.524.88a7.962 7.962 0 012.58 2.58c.568 1.36.88 2.904.88 4.524s-.312 3.164-.88 4.524a7.962 7.962 0 01-2.58 2.58c-1.36.568-2.904.88-4.524.88s-3.164-.312-4.524-.88a7.962 7.962 0 01-2.58-2.58C3.312 10.41 3 8.866 3 7.246s.312-3.164.88-4.524a7.962 7.962 0 012.58-2.58C8.836 2.562 10.38 2.25 12 2.25z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 8.25h.008v.008H15.75zM12 7.8a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6z"
          />
        </svg>
      </div>

      {/* Instagram Information */}
      <div className="ml-4 flex flex-col">
        <h3 className="text-lg font-normal text-black">instagram</h3>
        <p className="text-sm text-gray-400">
          100 <span className="font-semibold">followers</span>
        </p>
      </div>

      {/* Follow Button */}
      <button className="ml-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Follow
      </button>
    </div>
  );
};

export default Accounts;
