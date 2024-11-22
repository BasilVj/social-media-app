import React from "react";

type Avatar = {
  url: string;
};
const Avatar = ({ url }: Avatar) => {
  return (
    <div className={`w-12 relative`}>
      <div className="rounded-full overflow-hidden">
        <img src={url} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Avatar;
