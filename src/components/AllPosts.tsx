import { FC } from "react";
import { PostProps } from "../Interface";
import { MdOutlinePersonOutline, MdOutlineAccessTime } from "react-icons/md";

const AllPosts: FC<PostProps> = ({ post }) => {
  return (
    <div
      key={post.id}
      className="w-full border-2 border-gray-500 rounded-lg p-4 flex flex-col gap-4"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 border-2 border-gray-300 rounded-full flex justify-center items-center font-semibold">
          {post.user.name.slice(0, 1)}
          {post.user.surname.slice(0, 1)}
        </div>
        <div className="ml-2">
          <div className="flex items-center">
            <MdOutlinePersonOutline className="mr-1" />
            <p className="text-xs">
              {post.user.name} {post.user.surname}
            </p>
          </div>
          <div className="flex items-center">
            <MdOutlineAccessTime className="mr-1" />
            <p className="text-xs mt-[1px]">{post.date}</p>
          </div>
        </div>
      </div>
      <div>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default AllPosts;
