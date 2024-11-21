import React from "react";

const FriendInfo = () => {
  return (
    <div className="flex gap-2 border-b border-b-gray-100 p-4 w-full">
      <div className={`w-12 relative`}>
        <div className="rounded-full overflow-hidden">
          <img
            src={
              "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
            }
            alt=""
            className="w-full"
          />
        </div>
      </div>
      <div>
        <h3 className="font-bold text-xl">Jane Doe</h3>
        <div className="text-sm leading-3">5 mutual friends</div>
      </div>
    </div>
  );
};

export default FriendInfo;
