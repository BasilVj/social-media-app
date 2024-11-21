import React from "react";
import Accounts from "./Accounts";

const SuggestedForYou = () => {
  return (
    <div className="mb-4">
      <h3 className="pb-3">Suggested for you</h3>
      <div className="h-[85vh] rounded-lg shadow-lg overflow-y-scroll">
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
        <Accounts />
      </div>
    </div>
  );
};

export default SuggestedForYou;
