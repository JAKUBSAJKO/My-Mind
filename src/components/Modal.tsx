import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

const Modal: FC<Props> = ({ children }) => {
  return createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-modal-overlay" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-lg">
        {children}
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
