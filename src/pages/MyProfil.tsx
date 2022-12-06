import { FC, useContext } from "react";

import { UsersContext } from "../contexts/context";
import PostDetail from "../components/PostDetail";

const MyProfil: FC = () => {
  const usersContext = useContext(UsersContext);

  const postOfUser = usersContext?.posts.filter(
    (user) => user.user.login === usersContext.activeUser?.login
  );

  return (
    <div className="bg-day-bg-posts min-h-[calc(100vh-92px)] px-48 py-8 flex justify-center items-center gap-4">
      <div className="basis-1/3 h-96 bg-zinc-300 rounded-md shadow-lg flex flex-col justify-center items-center gap-4">
        <div className="bg-green-400 w-24 h-24 rounded-full flex justify-center items-center text-3xl font-semibold shadow-lg">
          {usersContext!.activeUser?.name.slice(0, 1)}
          {usersContext!.activeUser?.surname.slice(0, 1)}
        </div>
        <h1 className="text-xl font-semibold">
          {`${usersContext?.activeUser?.name} ${usersContext?.activeUser?.surname}`}
        </h1>
      </div>
      <div className="basis-2/3 h-96 bg-zinc-300 rounded-md shadow-lg p-8 flex flex-col gap-4 overflow-auto">
        {postOfUser?.map((post) => <PostDetail post={post} />).reverse()}
      </div>
    </div>
  );
};

export default MyProfil;
