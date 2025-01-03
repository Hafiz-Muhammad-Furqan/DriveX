import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const UserSignin = () => {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center flex-col gap-8 py-4 px-3">
      <div className="flex items-center justify-center gap-1 absolute top-5 left-5">
        <img
          src="/Images/Logo.png"
          alt="logo"
          className="object-cover bg-center h-6 w-6"
        />
        <p className="text-white text-base font-semibold">inDrive</p>
      </div>
      <h1 className="text-white text-3xl font-semibold">Sign in</h1>
      <form className="h-full w-full flex items-center justify-around flex-col gap-7">
        <Input placeholder={"Enter your Email"} type={"email"} />
        <Input placeholder={"Enter your password"} type={"password"} />
        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white"> Don't have an account?</p>
          <Link to="/user/signup" className="text-blue-600 ">
            Sign up
          </Link>
        </div>
        <Button label={"Sign in"} colors={"bg-[#C1F11D]"} />
      </form>
    </div>
  );
};

export default UserSignin;
