import Btn1 from "../components/Btn1";
import Input from "../components/Input";

const Signup = () => {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center flex-col gap-8 py-6">
      <div className="flex items-center justify-center gap-1">
        <img
          src="/Images/Logo.png"
          alt="logo"
          className="object-cover bg-center h-6 w-6"
        />
        <p className="text-white text-base">inDrive</p>
      </div>
      <h1 className="text-white text-3xl font-medium">Sign up</h1>
      <form className="h-full w-full flex items-center justify-around flex-col gap-7">
        <Input placeholder={"Enter your First Name"} type={"text"} />
        <Input placeholder={"Enter your Last Name"} type={"text"} />
        <Input placeholder={"Enter your Email"} type={"email"} />
        <Input placeholder={"Enter your Password"} type={"password"} />
        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white">Already have an account </p>
          <a href="" className="text-blue-600">
            Signin
          </a>
        </div>
        <Btn1 label={"Sign up"} />
      </form>
    </div>
  );
};

export default Signup;
