import React from "react";
import Select, { MultiValue } from "react-select";

const UserListDropdown = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleChange = (
    e: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    console.log(e);
  };

  return (
    <div>
      <Select
        options={options}
        onChange={handleChange}
        name="users"
        isMulti
        className="mt-1 focus:border-[#2563eb] focus:border-2"
      />
    </div>
  );
};

export default UserListDropdown;
