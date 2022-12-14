import { FC, SetStateAction, Dispatch, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Switch } from "@headlessui/react";
import { HiMenu } from "react-icons/hi";
import { WiDaySunny, WiNightAltCloudy } from "react-icons/wi";

import { UsersContext } from "../contexts/context";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../Interface";
import { routes } from "../routes/routes";
import Logo from "../assets/images/logo.png";

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const Navbar: FC<Props> = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const usersContext = useContext(UsersContext);
  const [localAcitveUser, setLocalActiveUser] = useLocalStorage<User | null>(
    "activeUser",
    null
  );

  const logout = () => {
    usersContext?.setActiveUser(null);
    setLocalActiveUser(null);
    localStorage.removeItem("session");
    navigate(routes.start);
  };

  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center text-sm shadow-md dark:bg-navbar-dark-mode dark:text-neutral-200 dark:shadow-lg dark:shadow-neutral-100">
      <img src={Logo} alt="Logo" width={56} />
      <div className="hidden grow sm:block">
        {usersContext?.activeUser ? (
          <div className="relative">
            <ul className="flex justify-center items-center gap-8">
              <NavLink
                to={routes.home}
                className={({ isActive }) => (isActive ? "nav-link" : "")}
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to={routes.myProfil}
                className={({ isActive }) => (isActive ? "nav-link" : "")}
              >
                <li>Mój profil</li>
              </NavLink>
            </ul>
            <Switch
              checked={isDarkMode}
              onChange={setIsDarkMode}
              className={`${
                isDarkMode ? "bg-emerald-600" : "bg-emerald-400"
              } absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-8 w-16 items-center rounded-full`}
            >
              <span
                className={`${
                  isDarkMode ? "translate-x-[40px]" : "translate-x-1"
                } h-6 w-6 transform rounded-full bg-white dark:bg-neutral-200 transition flex justify-center items-center`}
              >
                {isDarkMode ? (
                  <WiNightAltCloudy className="text-emerald-900 text-lg" />
                ) : (
                  <WiDaySunny className="text-emerald-900 text-lg" />
                )}
              </span>
            </Switch>
          </div>
        ) : null}
      </div>
      <div className="hidden sm:flex sm:items-center sm:gap-4">
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
      <Menu>
        <Menu.Button className="sm:hidden">
          <HiMenu className="text-2xl" />
        </Menu.Button>
        <Menu.Items className="absolute top-0 right-0 bottom-0 left-0 p-16 bg-green-200 dark:bg-neutral-800 flex flex-col justify-between">
          <Menu.Item>
            {({ close, active }) => (
              <>
                {usersContext?.activeUser ? (
                  <ul className="flex flex-col justify-center items-center gap-6 mt-8 text-lg uppercase">
                    <Link to={routes.home} onClick={close}>
                      <li>Home</li>
                    </Link>
                    <Link
                      to={routes.myProfil}
                      onClick={close}
                      className="text-center"
                    >
                      <li>Mój profil</li>
                    </Link>
                  </ul>
                ) : null}
              </>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ close }) => (
              <>
                {usersContext?.activeUser ? (
                  <div className="flex justify-center items-center">
                    <button
                      className="btn-mobile"
                      onClick={() => {
                        logout();
                        close();
                      }}
                    >
                      Wyloguj
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-8 text-lg">
                      <Link
                        to={routes.login}
                        onClick={close}
                        className="btn-mobile"
                      >
                        Zaloguj
                      </Link>
                      <p className="text-xs font-normal">LUB</p>
                      <Link
                        to={routes.signUp}
                        onClick={close}
                        className="btn-mobile"
                      >
                        Rejestracja
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  );
};

export default Navbar;
