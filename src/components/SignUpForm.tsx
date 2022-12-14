import { FC, useContext, useState, Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { UsersContext } from "../contexts/context";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../Interface";

const PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm: FC<Props> = ({ setOpenModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const [signUpStatus, setSignUpStatus] = useState<string | null>(null);

  const usersContext = useContext(UsersContext);

  const [localUsers, setLocalUsers] = useLocalStorage<User[]>("localUsers", []);

  const onSubmit: SubmitHandler<User> = (data) => {
    const usersAlreadyExist = usersContext?.users.filter(
      (user) => user.login === data.login
    );

    if (usersAlreadyExist !== undefined) {
      if (usersAlreadyExist?.length > 0) {
        setSignUpStatus("Login jest już zajęty");
      } else {
        usersContext?.addUser(data);
        setLocalUsers([...localUsers, data]);
        setSignUpStatus(null);
        setOpenModal(true);
      }
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h1 className="text-xl font-medium mb-6">Zarejestruj się</h1>
      <input
        type="text"
        autoComplete="off"
        {...register("name", { required: "Podaj imię" })}
        placeholder="Podaj imię"
        className="h-10 w-64 rounded-lg bg-green-100 dark:bg-neutral-700 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <input
        type="text"
        autoComplete="off"
        {...register("surname", { required: "Podaj nazwisko" })}
        placeholder="Podaj nazwisko"
        className="h-10 w-64 rounded-lg bg-green-100 dark:bg-neutral-700 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <input
        type="text"
        autoComplete="off"
        {...register("login", { required: "Podaj login" })}
        placeholder="Stwórz login"
        className="h-10 w-64 rounded-lg bg-green-100 dark:bg-neutral-700 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <input
        type="password"
        autoComplete="off"
        {...register("password", {
          required: "Podaj hasło",
          pattern: {
            value: PATTERN,
            message:
              "Hasło musi zawierać: 1 dużą literę, 1 cyfrę, 1 znak specjalny oraz musi być długości conajmniej 6 znaków.",
          },
        })}
        placeholder="Podaj hasło"
        className="h-10 w-64 rounded-lg bg-green-100 dark:bg-neutral-700 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <div className="flex flex-col mx-4 text-red-500 text-xs">
        <p>{errors.name?.message}</p>
        <p>{errors.surname?.message}</p>
        <p>{errors.login?.message}</p>
        <p className="w-56">{errors.password?.message}</p>
        <p className="mb-4">{signUpStatus}</p>
      </div>
      <input
        type="submit"
        value="Zarejestruj się"
        className="w-64 border-2 border-green-500 dark:border-green-600 rounded-lg py-4 text-center bg-green-500 dark:bg-green-600  text-white text-xs drop-shadow-button cursor-pointer transition-all hover:scale-110"
      />
    </form>
  );
};

export default SignUpForm;
