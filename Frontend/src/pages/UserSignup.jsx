import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const UserSignup = () => {
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
      <h1 className="text-white text-3xl font-semibold">Sign up</h1>
      <form className="h-full w-full flex items-center justify-around flex-col gap-7">
        <Input placeholder={"Enter your First Name"} type={"text"} />
        <Input placeholder={"Enter your Last Name"} type={"text"} />
        <Input placeholder={"Enter your Email"} type={"email"} />
        <Input placeholder={"Enter your Password"} type={"password"} />
        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white">Already have an account? </p>
          <Link to="/user/signin" className="text-blue-600">
            Sign in
          </Link>
        </div>
        <Button label={"Sign up"} colors={"bg-[#C1F11D]"} />
      </form>
    </div>
  );
};

export default UserSignup;
