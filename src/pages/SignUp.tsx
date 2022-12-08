import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignUpForm from "../components/SignUpForm";
import signUpCharacter from "../assets/images/signUpCharacter.png";
import modalSignUp from "../assets/images/modalSignUp.png";
import Modal from "../components/Modal";
import { routes } from "../routes/routes";

const SignUp: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const correctSignUp = () => {
    setOpenModal(false);
    navigate(routes.login);
  };

  return (
    <div
      className="w-full flex flex-col justify-center items-center px-4 py-16 gap-12 sm:gap-16 md:gap-0
    md:py-0 md:px-0 md:flex-row md:h-[calc(100vh-82.5px)] md:max-w-3xl md:mx-auto"
    >
      <div className="basis-1/2">
        <img src={signUpCharacter} alt="Sign up character" width={512} />
      </div>
      <div className="basis-1/2 flex justify-center items-center">
        <SignUpForm setOpenModal={setOpenModal} />
      </div>
      {openModal ? (
        <Modal>
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="max-w-xs text-center px-4">
              Udało ci się pomyślnie zalogować do serwisu.
            </h1>
            <img src={modalSignUp} alt="" width={256} />
            <button
              className="bg-green-500 rounded-md px-4 py-2 text-xs text-white"
              onClick={correctSignUp}
            >
              Przejdź do logowania
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default SignUp;
