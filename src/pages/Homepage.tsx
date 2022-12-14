import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AllPosts from "../components/AllPosts";
import CreatePost from "../components/CreatePost";
import Modal from "../components/Modal";
import { UsersContext } from "../contexts/context";
import { routes } from "../routes/routes";
import CreatedPost from "../assets/images/createdPost.png";
import useLocalStorage from "../hooks/useLocalStorage";
import Spinner from "../components/Spinner";

const Homepage: FC = () => {
  const navigate = useNavigate();
  const usersContext = useContext(UsersContext);

  const [openModal, setOpenModal] = useState(false);
  const [session, setSession] = useLocalStorage("session", "");

  useEffect(() => {
    if (!session) navigate(routes.login);
  }, []);

  return (
    <div className="bg-day-bg-posts dark:bg-neutral-900 dark:text-neutral-200">
      {session ? (
        <div className="bg-day-bg-main-posts dark:bg-neutral-800 shadow-day-shadow-posts text-sm flex flex-col justify-center items-center py-8 gap-4 sm:max-w-screen-sm sm:mx-auto sm:gap-6 sm:p-16">
          <CreatePost setOpenModal={setOpenModal} />
          {usersContext?.posts
            .map((post) => <AllPosts key={post.id} post={post} />)
            .reverse()}
        </div>
      ) : (
        <Spinner />
      )}
      {openModal ? (
        <Modal>
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <img src={CreatedPost} alt="" width={128} />
            <h1 className="text-base font-normal">Post został utworzony</h1>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Homepage;
