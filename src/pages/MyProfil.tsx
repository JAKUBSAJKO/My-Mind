import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UsersContext } from "../contexts/context";
import PostDetail from "../components/PostDetail";
import useLocalStorage from "../hooks/useLocalStorage";
import { routes } from "../routes/routes";
import Spinner from "../components/Spinner";

const MyProfil: FC = () => {
  const navigate = useNavigate();
  const usersContext = useContext(UsersContext);

  const postOfUser = usersContext?.posts.filter(
    (user) => user.user.login === usersContext.activeUser?.login
  );

  const [session, setSession] = useLocalStorage("session", "");

  useEffect(() => {
    if (!session) navigate(routes.login);
  }, []);

  return (
    <div className="bg-day-bg-posts">
      {session ? (
        <div className=" py-8 flex flex-col justify-center items-center gap-8 sm:px-12 md:min-h-[calc(100vh-92px)] md:flex-row md:px-8 md:gap-4 lg:max-w-3xl lg:mx-auto">
          {usersContext?.activeUser ? (
            <>
              <div className="basis-1/3 bg-zinc-300 px-16 py-6 rounded-md shadow-lg flex flex-col justify-center items-center gap-4 sm:px-24 md:h-96 md:p-0">
                <div className="bg-green-400 w-24 h-24 rounded-full flex justify-center items-center text-3xl font-semibold shadow-lg">
                  {usersContext!.activeUser?.name.slice(0, 1)}
                  {usersContext!.activeUser?.surname.slice(0, 1)}
                </div>
                <h1 className="text-base font-semibold sm:text-xl">
                  {`${usersContext?.activeUser?.name} ${usersContext?.activeUser?.surname}`}
                </h1>
              </div>
              <div className="basis-2/3 h-96 bg-zinc-300 rounded-md shadow-lg p-8 flex flex-col gap-4 overflow-auto">
                {postOfUser?.length! > 0 ? (
                  postOfUser
                    ?.map((post) => <PostDetail key={post.id} post={post} />)
                    .reverse()
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <h2>Jeszcze nie dodałeś posta...</h2>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MyProfil;
