import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import showToast from "../Utilities/Toast";
import axios from "axios";
import {
  authenticationStart,
  authenticationFailed,
  authenticationSuccess,
} from "../Slices/UserSlice";

const UserSignin = () => {
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
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(authenticationFailed(null));
    }
  }, [error, dispatch]);

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
    dispatch(authenticationStart());
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
      dispatch(authenticationSuccess(response.data.user));
      navigate("/user/dashboard");
    } catch (error) {
      dispatch(authenticationFailed(error.message));
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center flex-col gap-8 py-4 px-3">
      <div className="flex items-center justify-center gap-1 absolute top-5 left-5">
        <img
          src="/Images/Logo.png"
          alt="logo"
          className="object-cover bg-center h-6 w-6"
        />
        <p className="text-white text-base font-semibold">inDrive</p>
      </div>
      <h1 className="text-white text-3xl font-semibold">Sign in</h1>
      <form
        className="h-full w-full flex items-center justify-around flex-col gap-7"
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
            <div className="loader"></div>
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
