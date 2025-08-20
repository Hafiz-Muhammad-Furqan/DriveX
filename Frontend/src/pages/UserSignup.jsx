import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import showToast from "../utilities/Toast.js";
import axios from "axios";

const UserSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    if (error) {
      showToast(error);
      setError(null);
    }
  }, [error]);

  const handleInputChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { firstname, lastname, email, password } = signupData;

    // Client-side basic validation
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      showToast("All fields are required");
      return;
    } else if (password.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

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
      setLoading(false);
      navigate("/user/dashboard");
    } catch (error) {
      setLoading(false);

      if (
        error?.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        const firstError = error.response.data.errors[0]?.msg;
        showToast(firstError);
        return;
      }

      // Custom backend error (e.g., duplicate user)
      if (error?.response?.data?.message) {
        showToast(error.response.data.message);
        return;
      }

      // Axios/network or unknown error
      showToast("Something went wrong. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center flex-col gap-8 py-4 px-3 ">
      <img
        src="/Images/Logo.png"
        alt="logo"
        className="object-cover bg-center h-8 "
      />
      <h1 className="text-white text-3xl font-semibold">Sign up</h1>
      <form
        className="h-full w-full flex items-center justify-center flex-col gap-7"
        onSubmit={handleSubmit}
      >
        {inputs.map((input, index) => (
          <Input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={signupData[input.name]}
            onChange={handleInputChange}
          />
        ))}
        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white">Already have an account? </p>
          <Link to="/user/signin" className="text-blue-600">
            Sign in
          </Link>
        </div>
        {loading ? (
          <div className="w-[96%] rounded-xl py-1 cursor-not-allowed  text-center bg-[#C1F11D] flex items-center justify-center ">
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
