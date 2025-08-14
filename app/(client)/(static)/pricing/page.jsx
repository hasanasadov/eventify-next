"use client";

import { Container } from "@mui/material";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  const plans = [
    {
      id: 1,
      name: "Starter",
      type: "Trial",
      monthlyPrice: "$0",
      annualPrice: "$0",
      credits: "5 Credits",
      users: "1 User",
      features: [
        "Direct Phone Numbers",
        "Landline Phone Numbers",
        "Corporate Email Addresses",
        "Prospect List",
        "Chrome Extension",
      ],
      buttonText: "Downgrade",
    },
    {
      id: 2,
      name: "Value",
      type: "Fast Start",
      monthlyPrice: "$49",
      annualPrice: "$499",
      credits: "50 Credits per month",
      users: "Unlimited Users",
      features: [
        "Direct Phone Numbers",
        "Landline Phone Numbers",
        "Corporate Email Addresses",
        "Prospect List",
        "Chrome Extension",
      ],
      buttonText: "Get Started",
    },
    {
      id: 3,
      name: "Pro",
      type: "Accelerate",
      monthlyPrice: "$89",
      annualPrice: "$899",
      credits: "100 Credits per month",
      users: "Unlimited Users",
      features: [
        "Direct Phone Numbers",
        "Landline Phone Numbers",
        "Corporate Email Addresses",
        "Prospect List",
        "Chrome Extension",
      ],
      buttonText: "Upgrade",
    },
  ];

  const handleTogglePricing = (annual) => {
    setIsAnnual(annual);
  };

  const handleButtonClick = (planId) => {
    const selected = plans.find((plan) => plan.id === planId);
    setSelectedPlan(selected);
    setActionMessage(
      `You have selected the "${selected.name}" plan with ${
        isAnnual ? "Annual" : "Monthly"
      } pricing.`
    );
  };

  const buttonBaseStyle =
    "rounded-lg py-3 px-6 w-full font-semibold text-sm transition-all duration-300 transform hover:scale-105";

  return (
    <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-8 lg:px-24">
      <Container>
        {/* Heading Section */}
        <div className="text-center text-white">
          <h1 className="text-4xl font-semibold tracking-wide mb-4">
            Your Subscription
          </h1>
          <p className="text-lg opacity-90">
            Choose the plan that fits your needs, with flexible billing options.
          </p>
        </div>

        {/* Toggle between Monthly and Annual */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex border-2 border-white rounded-full overflow-hidden">
            <button
              className={`${
                !isAnnual
                  ? "bg-[#128C7E] text-white"
                  : "bg-white text-[#075E54] dark:text-[#18f3d9] hover:bg-gray-100"
              } font-medium py-2 px-6 rounded-l-full transition-all duration-300`}
              onClick={() => handleTogglePricing(false)}
            >
              Monthly
            </button>
            <button
              className={`${
                isAnnual
                  ? "bg-[#128C7E] text-white"
                  : "bg-white text-[#075E54] dark:text-[#18f3d9] hover:bg-gray-100"
              } font-medium py-2 px-6 rounded-r-full transition-all duration-300`}
              onClick={() => handleTogglePricing(true)}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 bg-white rounded-lg shadow-lg border-2 transition-all duration-500 transform hover:scale-105 ${
                selectedPlan?.id === plan.id
                  ? "border-[#128C7E] bg-[#E8F5E9]"
                  : "border-gray-200"
              }`}
            >
              {/* Plan Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-gray-500 uppercase bg-gray-100 px-3 py-1 rounded-full">
                  {plan.name}
                </span>
              </div>

              {/* Plan Details */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#075E54] dark:text-[#18f3d9]">
                  {plan.type}
                </h3>
                <p className="text-4xl font-extrabold text-[#128C7E] mt-2">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </p>
                <p className="text-sm text-gray-500">
                  {isAnnual ? "Billed Annually" : "Billed Monthly"}
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {plan.credits}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {plan.users}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheckCircle className="text-[#128C7E] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button Section */}
              <div className="mt-6">
                <button
                  className={`${
                    selectedPlan?.id === plan.id
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#128C7E] text-white hover:bg-[#075E54] active:scale-95"
                  } ${buttonBaseStyle}`}
                  disabled={selectedPlan?.id === plan.id}
                  onClick={() => handleButtonClick(plan.id)}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {actionMessage && (
          <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-lg text-center transition-all duration-300">
            {actionMessage}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Pricing;
