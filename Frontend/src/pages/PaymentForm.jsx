import React, { useState } from "react";
import {
  CreditCard,
  Lock,
  AlertCircle,
  CheckCircle,
  Car,
  MapPin,
  Calendar,
} from "lucide-react";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Sample ride data - you can pass this as props
  const rideData = {
    from: "Liyari Express Garden Toll, Garden West Area",
    to: "Malir 15 Flyover, Ghazi Dawood Brohi Goth",
    fare: "PKR 9840000",
    distance: "18.5 km",
    estimatedTime: "25 mins",
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    const newErrors = {};

    // Card number validation (basic Luhn algorithm)
    const cardNumber = formData.cardNumber.replace(/\s/g, "");
    if (!cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = "Invalid card number length";
    }

    // Expiry date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const [month, year] = formData.expiryDate.split("/");
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = parseInt(now.getFullYear().toString().substr(-2));

      if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = "Invalid expiry date";
      } else if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = "Card has expired";
      }
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = "Invalid CVV";
    }

    // Cardholder name validation
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCard()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Replace with your actual payment intent endpoint
      const response = await fetch(
        "http://localhost:4000/api/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseInt(rideData.fare.replace(/[^\d]/g, "")), // Convert fare to cents/paise
            currency: "pkr",
            cardNumber: formData.cardNumber.replace(/\s/g, ""),
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            cardholderName: formData.cardholderName,
            email: formData.email,
            phone: formData.phone,
            rideDetails: rideData,
          }),
        }
      );

      const data = await response.json();
      console.log(response.status);

      if (data) {
        setPaymentSuccess(true);
        // Handle successful payment (redirect, show success message, etc.)
      } else {
        setErrors({
          submit: data.message || "Payment failed. Please try again.",
        });
      }
    } catch (error) {
      setErrors({
        submit: "Payment failed. Please check your details and try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 text-center">
          <div className="mb-6">
            <div className="text-green-400 text-6xl mb-4 flex justify-center">
              <CheckCircle size={64} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-300">Your ride has been confirmed</p>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Amount Paid</span>
              <span className="text-green-400 font-bold">{rideData.fare}</span>
            </div>
          </div>
          <button className="w-full bg-lime-400 text-gray-900 font-semibold py-4 rounded-xl hover:bg-lime-300 transition-colors">
            Track Your Ride
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="text-lime-400 font-bold text-2xl mb-2 tracking-wider">
            DRIVEX
          </div>
          <h1 className="text-white text-xl font-semibold">Complete Payment</h1>
          <p className="text-gray-400 text-sm mt-2">
            Secure payment with end-to-end encryption
          </p>
        </div>

        {/* Ride Summary */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Car className="mr-2" size={20} />
            Ride Summary
          </h3>

          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div className="text-sm">
                <p className="text-gray-300">{rideData.from}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-3 h-3 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div className="text-sm">
                <p className="text-gray-300">{rideData.to}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                <p>
                  {rideData.distance} • {rideData.estimatedTime}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lime-400 font-bold text-lg">
                  {rideData.fare}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <div className="flex items-center mb-6">
            <Lock className="text-lime-400 mr-2" size={20} />
            <h3 className="text-white font-semibold">Payment Details</h3>
          </div>

          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                />
                <CreditCard
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
              </div>
              {errors.cardNumber && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                />
                {errors.expiryDate && (
                  <p className="text-red-400 text-xs mt-1 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.expiryDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                />
                {errors.cvv && (
                  <p className="text-red-400 text-xs mt-1 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
              />
              {errors.cardholderName && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.cardholderName}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-white font-medium mb-4">
                Contact Information
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-900/20 border border-red-700 rounded-xl p-3">
                <p className="text-red-400 text-sm flex items-center">
                  <AlertCircle size={16} className="mr-2" />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-lime-400 text-gray-900 font-semibold py-4 rounded-xl hover:bg-lime-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock size={20} className="mr-2" />
                  Pay {rideData.fare}
                </>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-xs flex items-center justify-center">
              <Lock size={12} className="mr-1" />
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pb-8">
          <p className="text-gray-500 text-xs">
            By proceeding, you agree to DriveX's Terms of Service and Privacy
            Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
