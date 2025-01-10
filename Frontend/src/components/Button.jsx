import { Link } from "react-router-dom";

const Button = ({ label, path, icon, colors, onclick }) => {
  return (
    <div
      className={`${colors} flex items-center w-[96%] rounded-xl py-2 cursor-pointer`}
      onClick={onclick}
    >
      {icon}
      <Link to={path} className="font-semibold text-lg text-center w-full">
        {label}
      </Link>
    </div>
  );
};

export default Button;
