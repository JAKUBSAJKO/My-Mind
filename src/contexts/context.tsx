import React, { createContext, FC, ReactNode, useState } from "react";
import { User } from "../Interface";

interface Props {
  children: ReactNode;
}

export interface UsersContextInterface {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  addUser: (user: User) => void;
}

export const UsersContext = createContext<UsersContextInterface | null>(null);

export const UsersContextProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([
    {
      name: "John",
      surname: "Johnson",
      login: "john",
      password: "john123",
    },
  ]);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const context = { users, setUsers, addUser };
  return (
    <UsersContext.Provider value={context}>{children}</UsersContext.Provider>
  );
};
