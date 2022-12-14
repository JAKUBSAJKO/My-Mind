import { FC } from "react";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { routes } from "../routes/routes";
import loginCharacter from "../assets/images/loginCharacter.png";

const Login: FC = () => {
  return (
    <div className="dark:bg-neutral-900 dark:text-neutral-200">
      <div className="w-full flex flex-col justify-center items-center px-4 py-16 gap-12 sm:gap-16 lg:h-[calc(100vh-82.5px)] lg:flex-row lg:px-36 lg:py-0 xl:max-w-5xl xl:mx-auto">
        <div className="basis-1/2 flex flex-col">
          <h1 className="text-4xl font-semibold mb-2">Rejestracja do</h1>
          <h2 className="text-3xl font-medium">My mind jest prosta</h2>
          <img
            src={loginCharacter}
            alt="Login Character"
            width={220}
            className="self-center md:self-start"
          />
          <p className="text-sm">Jeśli nie masz jeszcze konta</p>
          <p className="text-sm">
            Możesz{" "}
            <Link to={routes.signUp} className="text-green-400 font-semibold">
              zarejestrować się tutaj!
            </Link>
          </p>
        </div>
        <div className="basis-1/2 flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
