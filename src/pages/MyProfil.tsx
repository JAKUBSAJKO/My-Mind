import { FC, useContext } from "react";
import { UsersContext } from "../contexts/context";
import { WiTime4 } from "react-icons/wi";
import { MdDelete } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import { Post } from "../Interface";
import useLocalStorage from "../hooks/useLocalStorage";

const MyProfil: FC = () => {
  const [localPosts, setLocalPosts] = useLocalStorage<Post[]>("localPosts", []);
  const usersContext = useContext(UsersContext);

  const postOfUser = usersContext?.posts.filter(
    (user) => user.user.login === usersContext.activeUser?.login
  );

  const updatePost = (post: Post) => {
    const correctPost = usersContext?.posts.filter(
      (postFromArray) => postFromArray.id === post.id
    );
    alert(correctPost![0].body);
  };

  const deletePost = (post: Post) => {
    usersContext?.removePost(post);
    setLocalPosts(localPosts.filter((localPost) => localPost.id !== post.id));
  };

  return (
    <div className="bg-day-bg-posts min-h-[calc(100vh-102px)] px-48 py-16 flex justify-center items-center gap-4">
      <div className="basis-1/3 h-64 bg-red-300 rounded-lg flex flex-col justify-center items-center gap-4">
        <div className="bg-green-200 w-24 h-24 rounded-full flex justify-center items-center text-3xl font-semibold">
          {" "}
          {usersContext!.activeUser?.name.slice(0, 1)}
          {usersContext!.activeUser?.surname.slice(0, 1)}
        </div>
        <h1 className="text-xl font-semibold">
          {`${usersContext?.activeUser?.name} ${usersContext?.activeUser?.surname}`}
        </h1>
      </div>
      <div className="basis-1/2 max-h-80 bg-red-300 rounded-lg p-4 flex flex-col justify-center gap-4 overflow-auto">
        {postOfUser?.map((post) => (
          <div key={post.id} className="border-2 rounded-md p-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <WiTime4 />
                <h2 className="text-xs font-semibold">{post.date}</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updatePost(post)}>
                  <HiPencilAlt />
                </button>
                <button onClick={() => deletePost(post)}>
                  <MdDelete />
                </button>
              </div>
            </div>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfil;
