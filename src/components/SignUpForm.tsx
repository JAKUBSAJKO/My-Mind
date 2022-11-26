import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UsersContext } from "../contexts/context";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../Interface";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const usersContext = useContext(UsersContext);

  const [localUsers, setLocalUsers] = useLocalStorage<User[]>("localUsers", []);

  const onSubmit: SubmitHandler<User> = (data) => {
    usersContext?.addUser(data);
    setLocalUsers([...localUsers, data]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label className="flex flex-col">
        Imię:
        <input
          type="text"
          autoComplete="off"
          {...register("name", { required: true })}
        />
      </label>
      <label className="flex flex-col">
        Nazwisko:
        <input
          type="text"
          autoComplete="off"
          {...register("surname", { required: true })}
        />
      </label>
      <label className="flex flex-col">
        Login:
        <input
          type="text"
          autoComplete="off"
          {...register("login", { required: true })}
        />
      </label>
      <label className="flex flex-col">
        Hasło:
        <input
          type="password"
          autoComplete="off"
          {...register("password", {
            required: true,
            minLength: {
              value: 4,
              message: "Min length is 4",
            },
          })}
        />
      </label>
      <div className="flex flex-col">
        {errors.name && (
          <span className="text-xs text-red-500">Podaj imię</span>
        )}
        {errors.surname && (
          <span className="text-xs text-red-500">Podaj nazwisko</span>
        )}
        <p>{errors.login?.message}</p>
        {errors.password && (
          <span className="text-xs text-red-500">Podaj hasło</span>
        )}
      </div>
      <input
        type="submit"
        value="Zarejestruj"
        className="border-2 border-green-400 rounded-md px-4 py-2 cursor-pointer font-semibold transition-all hover:bg-green-400 hover:text-white"
      />
    </form>
  );
};

export default SignUpForm;
