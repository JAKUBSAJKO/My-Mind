import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UsersContext } from "../contexts/context";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../Interface";
import { routes } from "../routes/routes";
import Logo from "../assets/images/logo.png";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const usersContext = useContext(UsersContext);
  const [localAcitveUser, setLocalActiveUser] = useLocalStorage<User | null>(
    "activeUser",
    null
  );

  const logout = () => {
    usersContext?.setActiveUser(null);
    setLocalActiveUser(null);
    navigate(routes.start);
  };

  return (
    <nav className="container mx-auto px-4 py-4 flex items-center text-sm">
      <img src={Logo} alt="Logo" width={56} />
      <div className="grow">
        {usersContext?.activeUser ? (
          <ul className="flex justify-center items-center gap-8">
            <Link to={routes.home}>
              <li>Home</li>
            </Link>
            <Link to={routes.myProfil}>
              <li>Mój profil</li>
            </Link>
          </ul>
        ) : null}
      </div>
      <div className="flex items-center gap-4">
        {usersContext?.activeUser ? (
          <>
            <div className="h-12 w-12 border-2 border-emerald-500 rounded-full flex justify-center items-center text-lg font-bold">
              {usersContext!.activeUser?.name.slice(0, 1)}
              {usersContext!.activeUser?.surname.slice(0, 1)}
            </div>
            <button className="btn-outline" onClick={logout}>
              Wyloguj
            </button>
          </>
        ) : (
          <>
            <Link to={routes.login} className="btn-outline">
              Zaloguj
            </Link>
            <Link to={routes.signUp} className="btn-solid">
              Rejestracja
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
