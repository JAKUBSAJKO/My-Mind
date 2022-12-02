import { FC } from "react";
import { PostProps } from "../Interface";

const AllPosts: FC<PostProps> = ({ post }) => {
  return (
    <div
      key={post.id}
      className="w-full border-2 border-emerald-400 rounded-lg"
    >
      <p>{post.body}</p>
      <p>
        {post.user.name}
        {post.user.surname}
      </p>
      <p>{post.date}</p>
    </div>
  );
};

export default AllPosts;
