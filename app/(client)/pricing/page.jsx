"use client";

import React, { useState } from "react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false); // Toggle between annual and monthly plans
  const [selectedPlan, setSelectedPlan] = useState(null); // Track selected plan
  const [actionMessage, setActionMessage] = useState(""); // Message for user actions

  // Pricing plans
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

    // Update selected plan pricing when toggling
    if (selectedPlan) {
      const updatedPlan = plans.find((plan) => plan.id === selectedPlan.id);
      setSelectedPlan(updatedPlan);
      setActionMessage(
        `You have selected the "${updatedPlan.name}" plan with ${
          annual ? "Annual" : "Monthly"
        } pricing.`
      );
    }
  };

  const handleButtonClick = (planId, action) => {
    const selected = plans.find((plan) => plan.id === planId);
    setSelectedPlan(selected);
    setActionMessage(
      `You have selected the "${selected.name}" plan with ${
        isAnnual ? "Annual" : "Monthly"
      } pricing.`
    );
  };

  const buttonBaseStyle =
    "rounded-lg py-3 px-6 w-full font-semibold text-sm transition-all duration-300";

  return (
    <div className=" bg-gray-50 p-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#075E54]">
            Your Subscription
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Choose the plan that works best for you.
          </p>
        </div>

        {/* Toggle between Monthly and Annual */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex border border-gray-200 rounded-lg shadow-sm">
            <button
              className={`${
                !isAnnual
                  ? "bg-[#075E54] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } font-medium py-2 px-6 rounded-l-lg`}
              onClick={() => handleTogglePricing(false)}
            >
              Monthly
            </button>
            <button
              className={`${
                isAnnual
                  ? "bg-[#075E54] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } font-medium py-2 px-6 rounded-r-lg`}
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
              className={`p-6 bg-white rounded-lg shadow-lg border ${
                selectedPlan?.id === plan.id
                  ? "border-[#25D366] bg-[#E8F5E9]"
                  : "border-gray-200"
              } transition-all duration-300`}
            >
              {/* Plan Header */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500 uppercase bg-gray-100 px-3 py-1 rounded-full">
                  {plan.name}
                </span>
              </div>

              {/* Plan Details */}
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">{plan.type}</h3>
                <p className="text-4xl font-extrabold text-[#075E54] mt-2">
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
                <ul className="mt-4 space-y-1 text-sm text-gray-600">
                  {plan.features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                  ))}
                </ul>
              </div>

              {/* Button Section */}
              <div className="mt-6">
                <button
                  className={`${
                    selectedPlan?.id === plan.id
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#25D366] text-white hover:bg-[#128C7E] active:scale-95"
                  } ${buttonBaseStyle}`}
                  disabled={selectedPlan?.id === plan.id}
                  onClick={() =>
                    handleButtonClick(plan.id, plan.buttonText.toLowerCase())
                  }
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Message */}
        {actionMessage && (
          <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            {actionMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
