import SignUpForm from "../components/SignUpForm";
import signUpCharacter from "../assets/images/signUpCharacter.png";

const SignUp = () => {
  return (
    <div className="w-full h-[calc(100vh-82.5px)] flex justify-center items-center px-36">
      <div className="basis-1/2">
        <img src={signUpCharacter} alt="Sign up character" width={512} />
      </div>
      <div className="basis-1/2 flex justify-center items-center">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
