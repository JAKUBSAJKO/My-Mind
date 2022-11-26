import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../Interface";

interface Props {
  children: ReactNode;
}

export interface UsersContextInterface {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  addUser: (user: User) => void;
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
  activeUser: User | null;
  setActiveUser: Dispatch<SetStateAction<User | null>>;
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
  const [logged, setLogged] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const [localUsers, setLocalUsers] = useLocalStorage<User[]>("localUsers", []);

  useEffect(() => {
    setUsers([...users, ...localUsers]);
  }, []);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const context = {
    users,
    setUsers,
    addUser,
    logged,
    setLogged,
    activeUser,
    setActiveUser,
  };
  return (
    <UsersContext.Provider value={context}>{children}</UsersContext.Provider>
  );
};
