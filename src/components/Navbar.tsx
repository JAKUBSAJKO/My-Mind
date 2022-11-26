import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../contexts/context";
import { routes } from "../routes/routes";

const Navbar = () => {
  const navigate = useNavigate();
  const usersContext = useContext(UsersContext);

  const logout = () => {
    usersContext?.setLogged(false);
    usersContext?.setActiveUser(null);
    navigate(routes.login);
  };

  return (
    <nav className="container mx-auto px-4 py-4 border-b-2 flex items-center text-sm">
      <h1>My Auth</h1>
      <div className="grow">
        {usersContext?.logged ? (
          <ul className="flex justify-center items-center gap-8">
            <Link to={routes.home}>
              <li>Home</li>
            </Link>
            <li>Content</li>
            <li>Contact</li>
          </ul>
        ) : null}
      </div>
      <div className="flex items-center gap-4">
        {usersContext?.logged ? (
          <>
            <div className="h-14 w-14 border-2 rounded-full flex justify-center items-center text-2xl font-bold">
              {usersContext.activeUser?.name.slice(0, 1)}
              {usersContext.activeUser?.surname.slice(0, 1)}
            </div>
            <button onClick={logout}>Wyloguj</button>
          </>
        ) : (
          <>
            <Link
              to={routes.login}
              className="border-2 border-emerald-400 rounded-lg px-6 py-2 font-semibold hover:bg-emerald-400 hover:text-white transition-all hover:duration-500"
            >
              Login
            </Link>
            <Link
              to={routes.signUp}
              className="border-2
      border-emerald-400
      bg-emerald-400
      rounded-lg
      px-6
      py-2
      font-semibold
      text-white"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
