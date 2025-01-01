import { Link } from "react-router-dom";

const GoogleBtn = ({ label, img }) => {
  return (
    <div className="flex items-center justify-center w-[96%] rounded-xl bg-gray-600 text-white py-3 gap-3">
      {img}
      <Link className="text-lg font-medium">{label}</Link>
    </div>
  );
};

export default GoogleBtn;
