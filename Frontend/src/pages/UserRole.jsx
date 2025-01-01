import Btn1 from "../components/Btn1";
import Btn2 from "../components/Btn2";
const UserRole = () => {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-around flex-col py-4 px-3">
      <div className="flex gap-3 flex-col">
        <h1 className="text-white text-3xl font-semibold text-center">
          Are you a passenger or Driver?
        </h1>
        <p className="text-neutral-400 text-lg text-center">
          You can change the mode later
        </p>
      </div>
      <img src="/Images/Car.png" alt="car" />
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <Btn1 label={"Passenger"} />
        <Btn2 label={"Driver"} />
      </div>
    </div>
  );
};

export default UserRole;
