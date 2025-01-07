import { Link } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";

const DriverSignup = () => {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center flex-col gap-8 py-4 px-3">
      <div className="flex items-center justify-start gap-1 self-start">
        <img
          src="/Images/Logo.png"
          alt="logo"
          className="object-cover bg-center h-6 w-6"
        />
        <p className="text-white text-base font-semibold">inDrive</p>
      </div>
      <h1 className="text-white text-3xl font-semibold">Driver Signup</h1>
      <form className="h-full w-full flex items-center justify-around flex-col gap-7">
        <Input
          placeholder={"Enter your First Name"}
          type={"text"}
          style={"py-2"}
        />
        <Input
          placeholder={"Enter your Last Name"}
          type={"text"}
          style={"py-2"}
        />
        <Input placeholder={"Enter your Email"} type={"email"} style={"py-2"} />
        <Input
          placeholder={"Enter your Password"}
          type={"password"}
          style={"py-2"}
        />
        <Input
          placeholder={"Vehicle Plate Number"}
          type={"text"}
          style={"py-2"}
        />
        <select className="border-[2px] border-white bg-zinc-700 text-white w-[95%] rounded-lg py-3 px-3 font-light outline-none">
          <option value="">Vehicle</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Auto">Auto</option>
        </select>
        <Input
          placeholder={"Vehicle Capacity"}
          type={"Number"}
          style={"py-2"}
        />
        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white">Already have an account? </p>
          <Link to="/driver/signin" className="text-blue-600">
            Sign in
          </Link>
        </div>
        <Button label={"Sign up"} colors={"bg-[#C1F11D]"} />
      </form>
    </div>
  );
};

export default DriverSignup;
