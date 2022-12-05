import { FC } from "react";
import { BiHappyAlt } from "react-icons/bi";
import { BsArrowDownShort } from "react-icons/bs";
import { MdPersonAddAlt1, MdLogin } from "react-icons/md";

import startImage from "../assets/images/startImage.png";

const Start: FC = () => {
  return (
    <div className="w-full bg-gray-200">
      <div className="w-full h-[calc(100vh-82.5px)] py-8 px-64 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-4">My auth</h1>
        <img src={startImage} alt="" width={515} />
        <h2 className="my-4">
          Stwórz darmowe konto i dołącz do naszej społeczności
        </h2>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="text-xs">więcej</p>
          <BsArrowDownShort className="text-md" />
        </div>
      </div>
      <div className="w-full h-64 bg-green-500 flex justify-center items-center">
        <div className="px-32 py-8 flex gap-4">
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
    </div>
  );
};

export default Start;
