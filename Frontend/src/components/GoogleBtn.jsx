import { Link } from "react-router-dom";

const GoogleBtn = () => {
  return (
    <div className="flex items-center justify-center w-[96%] rounded-xl bg-gray-600 text-white py-3 gap-3">
      <img src="/Images/Google.png" alt="google" className="h-7 w-7" />
      <Link className="text-lg font-medium">Continue with Google</Link>
    </div>
  );
};

export default GoogleBtn;
