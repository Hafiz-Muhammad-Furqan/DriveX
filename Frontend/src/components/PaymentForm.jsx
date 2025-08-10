// import { useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { Loader2, Lock, Check } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import showToast from "../utilities/Toast";

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { clientSecret, sertClientSecret } = useAuth();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [focusedField, setFocusedField] = useState(null);
//   const [completedFields, setCompletedFields] = useState({});

//   useEffect(() => {
//     if (error) {
//       showToast(error);
//     }
//   }, [error]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Mark field as completed when it has content
//     setCompletedFields((prev) => ({
//       ...prev,
//       [name]: value.length > 0,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     try {
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//             billing_details: {
//               name: formData.name,
//               email: formData.email,
//               phone: formData.phone,
//             },
//           },
//         }
//       );

//       if (error) {
//         showToast("Payment Failed: " + error.message, "error");
//       } else if (paymentIntent.status === "succeeded") {
//         confirmPayment(paymentIntent.id);
//       }
//     } catch (error) {
//       console.log(error.message);

//       if (error?.response?.data?.message) {
//         setError(error.response.data.message);
//         return;
//       }
//       setError("Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmPayment = async (paymentIntentId) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/payment/confirm-paymnet`,
//         {
//           paymentIntentId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       if (response.status === "success") {
//         showToast("Paymnet Successful!");
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       }
//     } catch (error) {
//       console.log(error.message);

//       if (error?.response?.data?.message) {
//         setError(error.response.data.message);
//         return;
//       }
//       setError("Payment failed");
//     }
//   };

//   const InputField = ({ label, name, type = "text", required = true }) => (
//     <div className="relative group">
//       <label
//         className={`absolute -top-7 left-0 sm:tracking-normal text-sm  font-medium transition-all duration-300 z-10 ${
//           focusedField === name || formData[name]
//             ? "text-gray-200 "
//             : "text-gray-200"
//         }`}
//       >
//         {label} {required && <span className="text-[#c1f11d]">*</span>}
//       </label>
//       <div className="relative">
//         <input
//           type={type}
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           onFocus={() => setFocusedField(name)}
//           onBlur={() => setFocusedField(null)}
//           className={`w-full bg-gray-800/40 border rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-400 transition-all duration-300 outline-none ${
//             focusedField === name
//               ? "border-gray-400 shadow-lg shadow-black/30 bg-gray-800"
//               : "border-gray-600 hover:border-gray-500"
//           } ${completedFields[name] ? "pr-10" : ""}`}
//           required={required}
//         />
//         {completedFields[name] && (
//           <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className=" w-full h-full overflow-y-auto no-scrollbar">
//       {/* Dark premium card */}
//       <div className="   p-6">
//         {/* Header */}
//         <div className="text-center mb-8 flex items-center justify-center flex-col">
//           <img
//             src="/Images/Logo.png"
//             alt="logo"
//             className="object-contain bg-center h-8 "
//           />
//           <h1 className="text-3xl font-bold text-white mb-2 tracking-wide pt-4">
//             Complete Payment
//           </h1>
//         </div>

//         <div className="space-y-12 pt-5">
//           <InputField label="Cardholder Name" name="name" />
//           <InputField label="Email Address" name="email" type="email" />
//           <InputField label="Phone Number" name="phone" type="tel" />

//           {/* Card Element */}
//           <div className="relative group">
//             <label className="absolute -top-7 left-0  text-sm font-medium text-white z-10">
//               Card Information <span className="text-[#c1f11d]">*</span>
//             </label>
//             <div className="mt-1 border border-gray-300 rounded-lg px-3 py-3.5 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500">
//               <CardElement
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: "16px",
//                       color: "#1f2937",
//                       fontFamily: "'Inter', system-ui, sans-serif",
//                       "::placeholder": {
//                         color: "#9ca3af",
//                       },
//                       iconColor: "#4f46e5",
//                     },
//                     invalid: {
//                       color: "#dc2626",
//                       iconColor: "#dc2626",
//                     },
//                     complete: {
//                       color: "#16a34a",
//                     },
//                   },
//                   hidePostalCode: true,
//                 }}
//               />
//             </div>
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={!stripe || loading}
//             className={`w-full relative overflow-hidden rounded-lg py-3  font-semibold text-black transition-all duration-300 transform ${
//               !stripe || loading
//                 ? "bg-gray-700 cursor-not-allowed opacity-50"
//                 : "bg-[#c1f11d] hover:scale-[1.01] hover:shadow-lg hover:shadow-black/40 active:scale-[0.99]"
//             }`}
//           >
//             <div className="relative flex items-center justify-center gap-3">
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   <span>Processing Payment...</span>
//                 </>
//               ) : (
//                 <>
//                   <Lock className="w-5 h-5" />
//                   <span>Pay Now</span>
//                 </>
//               )}
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;

import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, Lock, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import showToast from "../utilities/Toast";
import axios from "axios";

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

  useEffect(() => {
    if (error) {
      showToast(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCompletedFields((prev) => ({
      ...prev,
      [name]: value.length > 0,
    }));
  };

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
        showToast("Payment Failed: " + error.message, "error");
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
        showToast("Payment Successful!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Payment failed");
    }
  };

  const InputField = ({ label, name, type = "text", required = true }) => (
    <div className="relative group">
      <label
        className={`absolute -top-7 left-0 text-sm font-medium transition-all duration-300 z-10 text-gray-200`}
      >
        {label} {required && <span className="text-[#c1f11d]">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          className={`w-full bg-gray-800/40 border rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-400 transition-all duration-300 outline-none ${
            focusedField === name
              ? "border-gray-400 shadow-lg shadow-black/30 bg-gray-800"
              : "border-gray-600 hover:border-gray-500"
          } ${completedFields[name] ? "pr-10" : ""}`}
          required={required}
        />
        {completedFields[name] && (
          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
        )}
      </div>
    </div>
  );

  if (!clientSecret) {
    return (
      <div className="text-center text-white p-6">
        Loading payment details...
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar">
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
          <InputField label="Cardholder Name" name="name" />
          <InputField label="Email Address" name="email" type="email" />
          <InputField label="Phone Number" name="phone" type="tel" />

          <div className="relative group">
            <label className="absolute -top-7 left-0 text-sm font-medium text-white z-10">
              Card Information <span className="text-[#c1f11d]">*</span>
            </label>
            <div className="mt-1 border border-gray-300 rounded-lg px-3 py-3.5">
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
