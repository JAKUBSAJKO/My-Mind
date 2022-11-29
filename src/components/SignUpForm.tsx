import { FC, useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UsersContext } from "../contexts/context";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../Interface";

const SignUpForm: FC = () => {
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
      }
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h1 className="text-xl font-medium mb-6">Sign up</h1>
      <input
        type="text"
        autoComplete="off"
        {...register("name", { required: "Podaj imię" })}
        placeholder="Enter name"
        className="h-10 w-64 rounded-lg bg-green-100 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <input
        type="text"
        autoComplete="off"
        {...register("surname", { required: "Podaj nazwisko" })}
        placeholder="Enter surname"
        className="h-10 w-64 rounded-lg bg-green-100 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <input
        type="text"
        autoComplete="off"
        {...register("login", { required: "Podaj login" })}
        placeholder="Create login"
        className="h-10 w-64 rounded-lg bg-green-100 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <input
        type="password"
        autoComplete="off"
        {...register("password", {
          required: "Podaj hasło",
          minLength: {
            value: 4,
            message: "Min length is 4",
          },
        })}
        placeholder="Password"
        className="h-10 w-64 rounded-lg bg-green-100 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <div className="flex flex-col mx-4 text-red-500 text-xs">
        <p>{errors.name?.message}</p>
        <p>{errors.surname?.message}</p>
        <p>{errors.login?.message}</p>
        <p>{errors.password?.message}</p>
        <p className="mb-4">{signUpStatus}</p>
      </div>
      <input
        type="submit"
        value="Zarejestruj"
        className="w-64 border-2 border-green-500 rounded-lg py-4 text-center bg-green-500 text-white text-xs drop-shadow-button cursor-pointer transition-all hover:scale-110"
      />
    </form>
  );
};

export default SignUpForm;
