import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { UsersContext } from "../contexts/context";
import { User } from "../Interface";

interface Inputs {
  login: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const usersContext = useContext(UsersContext);
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
          usersContext?.setLogged(true);
          usersContext?.setActiveUser(loginExist[0]);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Login:</label>
      <input
        type="text"
        {...register("login", { required: "Login jest wymagany" })}
      />
      <label>Hasło:</label>
      <input
        type="password"
        autoComplete="off"
        {...register("password", { required: "Hasło jest wymagany" })}
      />
      <p>{errors.login?.message}</p>
      <p>{errors.password?.message}</p>
      <input type="submit" value="Zaloguj się" />
      {<p>{loginStatus}</p>}
    </form>
  );
};

export default LoginForm;
