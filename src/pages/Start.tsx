import { FC, useEffect } from "react";
import { BiHappyAlt } from "react-icons/bi";
import { BsArrowDownShort } from "react-icons/bs";
import { MdPersonAddAlt1, MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import startImage from "../assets/images/startImage.png";
import Spinner from "../components/Spinner";
import useLocalStorage from "../hooks/useLocalStorage";
import { routes } from "../routes/routes";

const Start: FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useLocalStorage("session", "");

  useEffect(() => {
    if (session) navigate(routes.home);
  }, []);

  return (
    <div className="w-full bg-gray-200 dark:bg-neutral-900 dark:text-neutral-200">
      {!session ? (
        <>
          <div className="w-full h-[calc(100vh-82.5px)] py-1 px-12 flex flex-col justify-center items-center sm:py-8 sm:px-0 sm:h-auto md:px-32 2xl:py-16">
            <h1 className="text-3xl font-semibold mb-4">My mind</h1>
            <img className="my-4 sm:my-0" src={startImage} alt="" width={515} />
            <h2 className="text-center my-4">
              Stwórz darmowe konto i dołącz do naszej społeczności
            </h2>
            <div className="flex flex-col justify-center items-center cursor-pointer">
              <p className="text-xs">więcej</p>
              <BsArrowDownShort className="text-md" />
            </div>
          </div>
          <div className="w-full bg-green-500 dark:bg-green-700 flex justify-center items-center sm:h-64">
            <div className="py-12 flex flex-col gap-8 sm:flex-row sm:py-8 sm:px-0 md:gap-4">
              <div className="start-card">
                <MdPersonAddAlt1 className="start-card-icon" />
                <p className="start-card-text">Stwórz konto</p>
              </div>
              <div className="start-card">
                <MdLogin className="start-card-icon" />
                <p className="start-card-text">Zaloguj się na konto</p>
              </div>
              <div className="start-card">
                <BiHappyAlt className="start-card-icon" />
                <p className="start-card-text">
                  Dziel się swoimi przemyśleniami ze światem
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner isFull />
      )}
    </div>
  );
};

export default Start;
