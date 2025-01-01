import Btn1 from "../components/Btn1";
import Input from "../components/Input";

const Signin = () => {
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
      <h1 className="text-white text-3xl font-medium">Sign in</h1>
      <form className="h-full w-full flex items-center justify-around flex-col gap-7">
        <Input placeholder={"Enter your Email"} type={"email"} />
        <Input placeholder={"Enter your password"} type={"password"} />
        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white"> Don't have an account</p>
          <a href="" className="text-blue-600">
            Signup
          </a>
        </div>
        <Btn1 label={"Sign in"} />
      </form>
    </div>
  );
};

export default Signin;
