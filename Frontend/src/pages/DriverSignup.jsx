import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import showToast from "../utilities/Toast.js";
import axios from "axios";

const DriverSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    plateNumber: "",
    capacity: "",
    vehicle: "",
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
    {
      type: "text",
      placeholder: "Vehicle Plate Number",
      name: "plateNumber",
    },
    {
      type: "Number",
      placeholder: "Vehicle Capacity",
      name: "capacity",
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

    const {
      firstname,
      lastname,
      email,
      password,
      plateNumber,
      capacity,
      vehicle,
    } = signupData;

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !plateNumber.trim() ||
      !capacity.trim() ||
      !vehicle.trim()
    ) {
      showToast("All fields are required");
      return;
    } else if (password.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const driver = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        plate: plateNumber,
        capacity,
        vehicleType: vehicle,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/captains/register`,
        driver
      );

      localStorage.setItem("driverToken", response.data.token);
      setLoading(false);
      navigate("/driver/dashboard");
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

      if (error?.response?.data?.message) {
        showToast(error.response.data.message);
        return;
      }

      showToast("Something went wrong. Please try again.");
      console.error("Driver Signup Error:", error);
    }
  };

  return (
    <div className="flex-1 w-full flex  flex-col gap-8 py-4 px-3 overflow-y-auto no-scrollbar items-center">
      <img
        src="/Images/Logo.png"
        alt="logo"
        className="object-contain bg-center h-8 "
      />
      <h1 className="text-white text-3xl font-semibold">Driver Signup</h1>
      <form
        className=" w-full flex items-center justify-around flex-col gap-7"
        onSubmit={handleSubmit}
      >
        {inputs.map((input, index) => (
          <Input
            key={index}
            placeholder={input.placeholder}
            type={input.type}
            name={input.name}
            value={signupData[input.name]}
            onChange={handleInputChange}
          />
        ))}
        <select
          className="border-[2px] border-white bg-zinc-700 text-white w-[95%] rounded-lg py-3 px-3 font-light outline-none"
          value={signupData.vehicle}
          onChange={handleInputChange}
          name="vehicle"
        >
          <option value="">Vehicle</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Auto">Auto</option>
        </select>

        <div className="w-full flex gap-1 justify-center ">
          <p className="text-white">Already have an account? </p>
          <Link to="/driver/signin" className="text-blue-600">
            Sign in
          </Link>
        </div>
        {loading ? (
          <div className="w-[96%] rounded-xl py-1 cursor-not-allowed text-center bg-[#C1F11D] flex items-center justify-center ">
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

export default DriverSignup;
