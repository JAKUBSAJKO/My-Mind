import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { initialPosts } from "../data/posts";
import { initialUsers } from "../data/users";
import useLocalStorage from "../hooks/useLocalStorage";
import { Post, User } from "../Interface";

interface Props {
  children: ReactNode;
}

export interface UsersContextInterface {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  addUser: (user: User) => void;
  activeUser: User | null;
  setActiveUser: Dispatch<SetStateAction<User | null>>;
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  addPost: (post: Post) => void;
  removePost: (post: Post) => void;
}

export const UsersContext = createContext<UsersContextInterface | null>(null);

export const UsersContextProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const [activeUser, setActiveUser] = useState<User | null>(null);

  const [localUsers, setLocalUsers] = useLocalStorage<User[]>("localUsers", []);
  const [localPosts, setLocalPosts] = useLocalStorage<Post[]>("localPosts", []);
  const [localActiveUser, setLocalActiveUser] = useLocalStorage<User | null>(
    "activeUser",
    null
  );

  useEffect(() => {
    setActiveUser(localActiveUser);
    setUsers([...users, ...localUsers]);
    setPosts([...posts, ...localPosts]);
  }, []);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const addPost = (post: Post) => {
    setPosts((prev) => [...prev, post]);
  };

  const removePost = (post: Post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const context = {
    users,
    setUsers,
    addUser,
    activeUser,
    setActiveUser,
    posts,
    setPosts,
    addPost,
    removePost,
  };
  return (
    <UsersContext.Provider value={context}>{children}</UsersContext.Provider>
  );
};
