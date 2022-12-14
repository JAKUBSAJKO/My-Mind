import { FC } from "react";
import { CircleLoader } from "react-spinners";

interface Props {
  isFull?: boolean;
}

const Spinner: FC<Props> = ({ isFull = false }) => {
  return (
    <div
      className={
        isFull
          ? "w-full flex justify-center items-center dark:bg-neutral-900 h-screen"
          : "w-full flex justify-center items-center dark:bg-neutral-900 h-[calc(100vh-82.5px)]"
      }
    >
      <CircleLoader color="#22c55e" />
    </div>
  );
};

export default Spinner;
