import { FC, useContext, Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

import { UsersContext } from "../contexts/context";
import { Post, User } from "../Interface";
import useLocalStorage from "../hooks/useLocalStorage";

interface Inputs {
  body: string;
}

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const CreatePost: FC<Props> = ({ setOpenModal }) => {
  const usersContext = useContext(UsersContext);
  const [localPosts, setLocalPosts] = useLocalStorage<Post[]>("localPosts", []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const postHandleSubmit: SubmitHandler<Inputs> = (data) => {
    const id = uuidv4();
    const currentDate = new Date();

    const date: string = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;

    const body: string = data.body;

    const user: User = usersContext?.activeUser!;
    const post: Post = { id, user, body, date };
    usersContext?.addPost(post);
    setLocalPosts([...localPosts, post]);
    setOpenModal(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 3000);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(postHandleSubmit)}
      className="w-full bg-gray-200 dark:bg-neutral-700 dark:text-neutral-200 px-8 py-4 flex flex-col gap-4 md:shadow-lg md:rounded-lg"
    >
      {usersContext?.activeUser ? (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border-2 border-green-400 bg-green-400 rounded-full flex justify-center items-center font-semibold dark:text-white">
            {usersContext!.activeUser?.name.slice(0, 1)}
            {usersContext!.activeUser?.surname.slice(0, 1)}
          </div>
          <div>{`${usersContext?.activeUser?.name} ${usersContext?.activeUser?.surname}`}</div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border-2 border-gray-300 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-4 rounded-lg bg-gray-300"></div>
        </div>
      )}
      <textarea
        placeholder="Podziel si?? my??l?? ze ??wiatem"
        className="max-h-32 rounded-md p-4 dark:bg-neutral-600 dark:text-neutral-200"
        {...register("body", {
          required: "Tekst jest wymagany",
          maxLength: { value: 300, message: "Maksymalnie 300 znak??w" },
        })}
      />
      <p className="self-end text-xs text-red-700">{errors.body?.message}</p>
      <button type="submit" className="max-w-fit self-end">
        <AiOutlineSend className="text-emerald-400 text-xl" />
      </button>
    </form>
  );
};

export default CreatePost;
