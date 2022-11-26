import { useContext } from "react";
import { UserContext } from "../contexts/test";

const Homepage = () => {
  const userContext = useContext(UserContext);
  return (
    <div>
      {userContext?.logged ? (
        <div className="text-green-800 font-black">zalogowany</div>
      ) : null}
    </div>
  );
};

export default Homepage;
