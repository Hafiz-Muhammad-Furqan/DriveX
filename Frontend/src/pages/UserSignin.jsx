import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import React, { useEffect, useState } from "react";
import showToast from "../utilities/Toast.js";
import axios from "axios";

const UserSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      type: "email",
      placeholder: "Enter your Email",
      name: "email",
    },
    {
      type: "password",
      placeholder: "Enter your Password",
      name: "password",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showToast(error);
      setError(null);
    }
  }, [error]);

  const handleInputChange = (event) => {
    setSigninData({ ...signinData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = signinData;
    if (email.trim() === "" || password.trim() === "") {
      showToast("All fields are required");
      return;
    } else if (password.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        user
      );
      localStorage.setItem("userToken", response.data.token);
      setLoading(false);
      navigate("/user/dashboard");
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setError(error.response?.data?.message);
      }
      setError(error.message);
    }
  };
  return (
    <div className="flex-1 w-full flex items-center justify-center flex-col gap-8 py-4 px-3 ">
      <img
        src="/Images/Logo.png"
        alt="logo"
        className="object-cover bg-center h-8 "
      />
      <h1 className="text-white text-3xl font-semibold">Sign in</h1>
      <form
        className="w-full flex items-center justify-center flex-col gap-7"
        onSubmit={handleSubmit}
      >
        {inputs.map((input, index) => (
          <React.Fragment key={index}>
            <Input
              placeholder={input.placeholder}
              type={input.type}
              name={input.name}
              value={signinData[input.name]}
              onChange={handleInputChange}
            />
          </React.Fragment>
        ))}
        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white"> Don't have an account?</p>
          <Link to="/user/signup" className="text-blue-600 ">
            Sign up
          </Link>
        </div>
        {loading ? (
          <div className="w-[96%] rounded-xl py-1 cursor-pointer text-center bg-[#C1F11D] flex items-center justify-center ">
            <div className="loader1"></div>
          </div>
        ) : (
          <button
            className="w-[96%] rounded-xl py-2 cursor-pointer font-semibold text-lg text-center bg-[#C1F11D]"
            type="submit"
            disabled={loading}
          >
            Sign in
          </button>
        )}
      </form>
    </div>
  );
};

export default UserSignin;
