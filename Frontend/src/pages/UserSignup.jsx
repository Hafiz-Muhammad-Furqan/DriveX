import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";
import showToast from "../Utilities/Toast";
import {
  authenticationStart,
  authenticationFailed,
  authenticationSuccess,
} from "../Slices/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const UserSignup = () => {
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const inputs = [
    {
      type: "text",
      placeholder: "Enter your First Name",
      name: "firstname",
    },
    {
      type: "text",
      placeholder: "Enter your Last Name",
      name: "lastname",
    },
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
  }, [error]);

  const handleInputChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstname, lastname, email, password } = signupData;
    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      showToast("All fields are required");
      return;
    } else if (password.length < 6) {
      showToast("Password must be at least 6 characters ");
      return;
    }
    dispatch(authenticationStart());
    const user = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        user
      );
      localStorage.setItem("userToken", response.data.token);
      dispatch(authenticationSuccess(response.data.user));
      navigate("/user/dashboard");
    } catch (error) {
      dispatch(authenticationFailed(error.message));
    }
  };

  return (
    <div className="min-h-[98dvh] w-full flex items-center justify-center flex-col gap-8 py-4 px-3 ">
      <div className="flex items-center justify-center gap-1 self-start">
        <img
          src="/Images/Logo.png"
          alt="logo"
          className="object-cover bg-center h-8 "
        />
      </div>
      <h1 className="text-white text-3xl font-semibold">Sign up</h1>
      <form
        className="h-full w-full flex items-center justify-around flex-col gap-7"
        onSubmit={handleSubmit}
      >
        {inputs.map((input, index) => (
          <React.Fragment key={index}>
            <Input
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={signupData[input.name]}
              onChange={handleInputChange}
            />
          </React.Fragment>
        ))}
        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white">Already have an account? </p>
          <Link to="/user/signin" className="text-blue-600">
            Sign in
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
            Sign up
          </button>
        )}
      </form>
    </div>
  );
};

export default UserSignup;
