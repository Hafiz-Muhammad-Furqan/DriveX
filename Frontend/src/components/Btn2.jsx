import { Link } from "react-router-dom";

const GoogleBtn = ({ label, img, style }) => {
  return (
    <div
      className={`flex items-center justify-center w-[96%] rounded-xl bg-gray-600  py-3 gap-3 ${style}`}
    >
      {img}
      <Link>{label}</Link>
    </div>
  );
};

export default GoogleBtn;
