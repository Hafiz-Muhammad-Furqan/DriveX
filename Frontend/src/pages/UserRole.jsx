import Button from "../components/Button";
const UserRole = () => {
  return (
    <div className="  h-full w-full flex items-center justify-between flex-col px-3 py-4">
      <div className="flex gap-3 flex-col items-center ">
        <img
          src="/Images/Logo.png"
          alt="logo"
          className="object-fill bg-center h-10 "
        />
        <h1 className="text-white text-3xl font-extrabold text-center px-3">
          Are you a passenger or Driver ?
        </h1>
      </div>
      <img src="/Images/Car.png" alt="car" className="h-60 " />
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <Button
          label={"Passenger"}
          colors={"bg-[#C1F11D]"}
          path={"/user/signin"}
        />
        <Button
          label={"Driver"}
          colors={"bg-gray-600 text-white"}
          path={"/driver/signin"}
        />
      </div>
    </div>
  );
};

export default UserRole;
