import { WiTime4 } from "react-icons/wi";
import { MdDelete } from "react-icons/md";
import { FC, useContext } from "react";

import { Post, PostProps } from "../Interface";
import useLocalStorage from "../hooks/useLocalStorage";
import { UsersContext } from "../contexts/context";

const PostDetail: FC<PostProps> = ({ post }) => {
  const usersContext = useContext(UsersContext);

  const [localPosts, setLocalPosts] = useLocalStorage<Post[]>("localPosts", []);

  const deletePost = (post: Post) => {
    usersContext?.removePost(post);
    setLocalPosts(localPosts.filter((localPost) => localPost.id !== post.id));
  };

  return (
    <div className="border-2 border-gray-500 rounded-md p-4 shadow-lg">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <WiTime4 />
          <h2 className="text-xs font-semibold">{post.date}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => deletePost(post)}>
            <MdDelete />
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm sm:text-base">{post.body}</p>
    </div>
  );
};

export default PostDetail;
