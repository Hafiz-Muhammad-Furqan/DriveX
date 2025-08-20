import { Link } from "react-router-dom";

const Button = ({ label, path, icon, colors, onclick, disable }) => {
  return (
    <div
      className={`${colors} flex items-center w-[96%] rounded-xl py-2 cursor-pointer ${
        disable ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onclick}
      disabled={disable}
    >
      {icon}
      <Link to={path} className="font-semibold text-lg text-center w-full">
        {label}
      </Link>
    </div>
  );
};

export default Button;
