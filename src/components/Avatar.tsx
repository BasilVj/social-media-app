import React from "react";

type Avatar = {
  url: string;
  width?: string;
};
const Avatar = ({ url, width }: Avatar) => {
  return (
    <div className={`${width ? width : "w-12"}  relative`}>
      <div className="rounded-full overflow-hidden">
        <img src={url} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Avatar;
