import { FC, useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { UsersContext } from "../contexts/context";
import { User } from "../Interface";
import useLocalStorage from "../hooks/useLocalStorage";

interface Inputs {
  login: string;
  password: string;
}

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const usersContext = useContext(UsersContext);
  const [localAcitveUser, setLocalAcitveUser] = useLocalStorage<User | null>(
    "activeUser",
    null
  );
  const [session, setSession] = useLocalStorage("session", "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const loginExist: User[] | undefined = usersContext?.users.filter(
      (user) => user.login === data.login
    );

    if (loginExist !== undefined) {
      if (loginExist.length > 0) {
        if (loginExist[0].password === data.password) {
          usersContext?.setActiveUser(loginExist[0]);
          setLocalAcitveUser(loginExist[0]);
          setSession("session_token");
          navigate(routes.home);
        } else {
          setLoginStatus("Błędne hasło");
        }
      } else {
        setLoginStatus("Błędny login");
      }
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h1 className="text-3xl font-medium mb-8">Log in</h1>
      <input
        type="text"
        {...register("login", { required: "Login jest wymagany" })}
        placeholder="User name"
        className="h-12 w-64 rounded-lg bg-green-100 text-xs placeholder-green-500 px-4 focus:border-none mb-4"
      />
      <input
        type="password"
        autoComplete="off"
        {...register("password", { required: "Hasło jest wymagany" })}
        placeholder="Password"
        className="h-12 w-64 rounded-lg bg-green-100 text-xs placeholder-green-500 px-4 focus:border-none mb-12"
      />
      <p>{errors.login?.message}</p>
      <p>{errors.password?.message}</p>
      <input
        type="submit"
        value="Zaloguj się"
        className="border-2 border-green-500 rounded-lg py-4 text-center bg-green-500 text-white text-xs drop-shadow-button cursor-pointer transition-all hover:scale-110"
      />
      {<p>{loginStatus}</p>}
    </form>
  );
};

export default LoginForm;
