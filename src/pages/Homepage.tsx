import { FC, useContext } from "react";
import CreatePost from "../components/CreatePost";
import { UsersContext } from "../contexts/context";

const Homepage: FC = () => {
  const usersContext = useContext(UsersContext);
  return (
    <div className="bg-day-bg-posts">
      <div className="bg-day-bg-main-posts shadow-day-shadow-posts mx-64 p-16 text-sm flex flex-col justify-center items-center gap-4">
        <CreatePost />
        {usersContext?.posts.map((post) => (
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
        ))}
      </div>
    </div>
  );
};

export default Homepage;
