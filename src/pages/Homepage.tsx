import { useContext } from "react";
import { UsersContext } from "../contexts/context";

const Homepage = () => {
  const usersContext = useContext(UsersContext);
  return (
    <div>
      {usersContext?.logged ? (
        <div className="text-green-800 font-black">zalogowany</div>
      ) : null}
    </div>
  );
};

export default Homepage;
