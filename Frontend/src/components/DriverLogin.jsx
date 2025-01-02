import Btn1 from "./Btn1";
import Input from "./Input";

const DriverLogin = () => {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center flex-col gap-8 py-4 px-3">
      <div className="flex items-center justify-start gap-1 self-start absolute top-8 left-8">
        <img
          src="/Images/Logo.png"
          alt="logo"
          className="object-cover bg-center h-6 w-6"
        />
        <p className="text-white text-base">inDrive</p>
      </div>
      <h1 className="text-white text-3xl font-medium"> Driver Login</h1>
      <form className="h-full w-full flex items-center justify-around flex-col gap-7">
        <Input placeholder={"Enter your Email"} type={"email"} style={"py-2"} />
        <Input
          placeholder={"Enter your Password"}
          type={"password"}
          style={"py-2"}
        />
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

export default DriverLogin;
