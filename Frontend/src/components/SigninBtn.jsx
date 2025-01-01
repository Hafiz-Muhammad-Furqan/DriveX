import { Link } from "react-router-dom";

const SigninBtn = () => {
  return (
    <div className="flex items-center justify-center w-[96%] rounded-xl bg-[#C1F11D] py-3">
      <Link className="text-lg font-semibold ">Continue with email</Link>
    </div>
  );
};

export default SigninBtn;
