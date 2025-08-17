import { useEffect, useState, useCallback } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, Lock, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import showToast from "../utilities/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputField = ({
  label,
  name,
  type = "text",
  required = true,
  value,
  onChange,
  onFocus,
  onBlur,
  completed,
  focused,
}) => {
  const inputId = `${name}-input`;

  return (
    <div className="relative group">
      <label
        htmlFor={inputId}
        className={`absolute -top-7 left-0 text-sm font-medium transition-all duration-300 z-10 text-gray-200`}
      >
        {label} {required && <span className="text-[#c1f11d]">*</span>}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          onFocus={() => onFocus(name)}
          onBlur={onBlur}
          className="w-full bg-gray-800/40 border rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-400 transition-all duration-300 outline-none border-gray-600 hover:border-gray-500 focus:border-gray-400 focus:shadow-lg focus:shadow-black/30 focus:bg-gray-800"
          required={required}
        />
        {completed && (
          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
        )}
      </div>
    </div>
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { clientSecret } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [completedFields, setCompletedFields] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showToast(error);
    }
  }, [error]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCompletedFields((prev) => ({
      ...prev,
      [name]: value.length > 0,
    }));
  }, []);

  const handleFocus = useCallback((name) => {
    setFocusedField(name);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedField(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card input not ready, please try again.");
      return;
    }

    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            },
          },
        }
      );

      if (error) {
        setError("Payment Failed: " + error.message, "error");
        console.log(error.message);
        console.log(clientSecret);
      } else if (paymentIntent.status === "succeeded") {
        confirmPayment(paymentIntent.id);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (paymentIntentId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/confirm-payment`,
        { paymentIntentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (res.data?.status === "success") {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/user/dashboard");
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar relative">
      {/* Success Animation Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative mx-auto w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                  className="text-gray-700"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  cx="60"
                  cy="60"
                  r="54"
                />
                <circle
                  className="text-[#c1f11d] animate-draw"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  cx="60"
                  cy="60"
                  r="54"
                  strokeDasharray="339.292"
                  strokeDashoffset="339.292"
                  style={{
                    animation: "draw 1s ease-out forwards",
                    animationDelay: "0.1s",
                  }}
                />
              </svg>
              <Check
                className="absolute inset-0 m-auto w-16 h-16 text-[#c1f11d]"
                style={{
                  opacity: 0,
                  animation: "fadeIn 0.3s ease-out forwards",
                  animationDelay: "0.8s",
                }}
              />
            </div>
            <h2
              className="text-2xl font-bold text-white mt-6 tracking-wide"
              style={{
                opacity: 0,
                animation: "fadeIn 0.5s ease-out forwards",
                animationDelay: "1.2s",
              }}
            >
              Payment Successful!
            </h2>
          </div>
          <style>
            {`
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          @keyframes progressBar {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-draw {
            animation: draw 1s ease-out forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-progressBar {
            animation: progressBar 2s ease-out forwards;
          }
        `}
          </style>
        </div>
      )}

      <div className="p-6">
        <div className="text-center mb-8 flex items-center justify-center flex-col">
          <img
            src="/Images/Logo.png"
            alt="logo"
            className="object-contain h-8"
          />
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide pt-4">
            Complete Payment
          </h1>
        </div>

        <form className="space-y-12 pt-5" onSubmit={handleSubmit}>
          <InputField
            label="Cardholder Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            completed={completedFields.name}
            focused={focusedField === "name"}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            completed={completedFields.email}
            focused={focusedField === "email"}
          />

          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            completed={completedFields.phone}
            focused={focusedField === "phone"}
          />

          <div className="relative group">
            <label className="absolute -top-7 left-0 text-sm font-medium text-white z-10">
              Card Information <span className="text-[#c1f11d]">*</span>
            </label>
            <div className="mt-1 border border-gray-600 rounded-lg px-3 py-3.5 hover:border-gray-500 focus-within:border-gray-400 focus-within:shadow-lg focus-within:shadow-black/30 focus-within:bg-gray-800 transition-all duration-300">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#fff",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      "::placeholder": { color: "#9ca3af" },
                      iconColor: "#c1f11d",
                    },
                    invalid: { color: "#dc2626", iconColor: "#dc2626" },
                    complete: { color: "#16a34a" },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full rounded-lg py-3 font-semibold text-black transition-all duration-300 ${
              !stripe || loading
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-[#c1f11d] hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Pay Now</span>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
