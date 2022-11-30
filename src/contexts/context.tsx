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
  const [users, setUsers] = useState<User[]>([
    {
      name: "John",
      surname: "Johnson",
      login: "john",
      password: "john123",
    },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "0000-0001",
      user: users[0],
      body: "Amet aliquam kasd vel rebum sit. Ea eirmod stet elitr sea facilisis et sea sit amet iriure magna elitr ipsum. Wisi dolores at voluptua dolores vero eum mazim praesent. Aliquyam kasd sed dolore lorem tempor eirmod nisl. Nonumy et dolor dolor nonumy sanctus aliquam stet et consetetur autem rebum justo erat duo lorem magna ipsum lorem. Et at enim dolor.",
      date: "2022-11-29",
    },
    {
      id: "0000-0002",
      user: users[0],
      body: "Nonumy illum consetetur magna sadipscing clita et sit ut. Vero dolore vel dolor lorem euismod sea eros ipsum. Vulputate diam dolore. Facilisi et vel vel qui tempor dolor. Ipsum et gubergren vero dolor dolore accumsan dolore. Molestie in lorem. Et volutpat ut duo. At et et sed stet hendrerit amet sit in lorem kasd eirmod vero sed invidunt autem.",
      date: "2022-11-29",
    },
    {
      id: "0000-0003",
      user: users[0],
      body: "Lorem et ut eros justo sea dolores sanctus aliquyam elitr consequat dolores takimata et. Dolore stet eirmod lorem aliquyam justo ipsum exerci sanctus sit zzril vero dolor placerat sanctus. Ea ipsum elitr et vero nulla dolor dolore nisl sed justo nulla augue clita nonummy dolore elitr. Et est et suscipit. Rebum amet diam. Commodo dolore et nulla eu at ea erat no rebum est nostrud takimata eirmod adipiscing kasd clita sit nonumy. Justo qui dolore. Erat sit ut takimata feugiat dolores.",
      date: "2022-11-29",
    },
  ]);

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
