import { FC } from "react";
import { CircleLoader } from "react-spinners";

const Spinner: FC = () => {
  return (
    <div className="w-full h-[calc(100vh-82.5px)] flex justify-center items-center">
      <CircleLoader color="#22c55e" />
    </div>
  );
};

export default Spinner;
