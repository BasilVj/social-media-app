import React, { createContext, useEffect, useState } from "react";

type UserContextProps = {
  children: React.ReactNode;
};

type UserContext = {
  loggedUser: appUser | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<appUser | null>>;
};

export type appUser = {
  userId: string;
  profilePic: string;
  username: string;
  followers: { userId: string; username: string }[] | null;
};

export const UserContext = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: UserContextProps) => {
  const [loggedUser, setLoggedUser] = useState<appUser | null>(null);
  useEffect(() => {
    console.log(loggedUser);
  }, [loggedUser]);

  const value = {
    loggedUser,
    setLoggedUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
