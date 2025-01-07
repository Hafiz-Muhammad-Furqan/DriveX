import Button from "../Components/Button";
const UserRole = () => {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-between flex-col pt-8 px-3 pb-4">
      <div className="flex gap-3 flex-col">
        <h1 className="text-white text-3xl font-extrabold text-center">
          Are you a passenger or Driver?
        </h1>
      </div>
      <img src="/Images/Car.png" alt="car" />
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <Button
          label={"Passenger"}
          colors={"bg-[#C1F11D]"}
          path={"/user/signin"}
        />
        <Button
          label={"Driver"}
          colors={"bg-zinc-600 text-white"}
          path={"/driver/signin"}
        />
      </div>
    </div>
  );
};

export default UserRole;
