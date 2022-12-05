import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AllPosts from "../components/AllPosts";
import CreatePost from "../components/CreatePost";
import { UsersContext } from "../contexts/context";
import { routes } from "../routes/routes";

const Homepage: FC = () => {
  const navigate = useNavigate();
  const usersContext = useContext(UsersContext);

  useEffect(() => {
    if (usersContext?.activeUser === null) navigate(routes.login);
  }, []);

  return (
    <div className="bg-day-bg-posts">
      <div className="bg-day-bg-main-posts shadow-day-shadow-posts mx-64 p-16 text-sm flex flex-col justify-center items-center gap-6">
        <CreatePost />
        {usersContext?.posts.map((post) => <AllPosts post={post} />).reverse()}
      </div>
    </div>
  );
};

export default Homepage;
