import { FC } from "react";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { routes } from "../routes/routes";
import loginCharacter from "../assets/images/loginCharacter.png";

const Login: FC = () => {
  return (
    <div className="w-full h-[calc(100vh-82.5px)] flex justify-center items-center px-36">
      <div className="basis-1/2 flex flex-col">
        <h1 className="text-4xl font-semibold mb-2">Sign in to</h1>
        <h2 className="text-3xl font-medium">My mind is simple</h2>
        <img
          src={loginCharacter}
          alt="Login Character"
          width={220}
          className="text-end"
        />
        <p className="text-sm">If you don't have an account register</p>
        <p className="text-sm">
          You can{" "}
          <Link to={routes.signUp} className="text-green-400 font-semibold">
            Register here!
          </Link>
        </p>
      </div>
      <div className="basis-1/2 flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
