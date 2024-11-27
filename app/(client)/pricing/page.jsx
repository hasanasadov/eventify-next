"use client";

import React, { useState } from "react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false); // Toggle between annual and monthly plans
  const [selectedPlan, setSelectedPlan] = useState(null); // Track selected plan
  const [actionMessage, setActionMessage] = useState(""); // Message for button actions

  // Pricing plans
  const plans = [
    {
      id: 1,
      name: "Starter",
      type: "Trial",
      monthlyPrice: "$0",
      annualPrice: "$0", // Annual Price
      credits: "5 Credits",
      users: "1 User",
      features: [
        "Direct Phone Numbers",
        "Landline Phone Numbers",
        "Corporate email addresses",
        "Propsetcs",
        "Chrome Extension",
      ],
      buttonText: "Downgrade",
      buttonColor: "#25D366", // WhatsApp green
      shade: "#A5D6A7", // Light Green shade
    },
    {
      id: 2,
      name: "Value",
      type: "Fast Start",
      monthlyPrice: "$49",
      annualPrice: "$499", // Annual Price
      credits: "50 Credits per month",
      users: "Unlimited users",
      features: [
        "Direct Phone Numbers",
        "Landline Phone Numbers",
        "Corporate email addresses",
        "Propsetcs",
        "Chrome Extension",
      ],
      buttonText: "Get",
      buttonColor: "#25D366", // WhatsApp green
      shade: "#81C784", // Medium Green shade
    },
    {
      id: 3,
      name: "Pro",
      type: "Accelerate",
      monthlyPrice: "$89",
      annualPrice: "$899", // Annual Price
      credits: "100 Credits per month",
      users: "Unlimited users",
      features: [
        "Direct Phone Numbers",
        "Landline Phone Numbers",
        "Corporate email addresses",
        "Propsetcs",
        "Chrome Extension",
      ],
      buttonText: "Upgrade",
      buttonColor: "#25D366", // WhatsApp green
      shade: "#388E3C", // Dark Green shade
    },
  ];

  const handleButtonClick = (planId, action) => {
    const selected = plans.find((plan) => plan.id === planId);
    setSelectedPlan(selected);
    setActionMessage(`You have ${action} the "${selected.name}" plan.`);
  };

  return (
    <div className="flex min-h-screen pt-8 px-6 sm:px-12 lg:px-24 bg-gray-50">
      <div className="w-full">
        <p className="text-[#075E54] text-3xl font-bold tracking-tight">
          Your Subscription
        </p>
        <p className="text-[#075E54] text-lg font-medium mt-2">
          Choose the plan that works best for you
        </p>

        {/* Toggle between Monthly and Annual */}
        <div className="mt-6 inline-flex border border-[#E1E3E5] rounded-lg">
          <button
            className={`${
              !isAnnual ? "bg-[#F6F6F7] text-[#075E54]" : "bg-white"
            } hover:bg-[#F6F6F7] text-[#075E54] font-semibold py-3 px-6 rounded-l-lg transition duration-300`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={`${
              isAnnual ? "bg-[#F6F6F7] text-[#075E54]" : "bg-white"
            } hover:bg-[#F6F6F7] text-[#075E54] font-semibold py-3 px-6 rounded-r-lg transition duration-300`}
            onClick={() => setIsAnnual(true)}
          >
            Annual
          </button>
        </div>

        {/* Plan Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`shadow-xl bg-white rounded-lg border transition-all duration-300 ${
                selectedPlan?.id === plan.id
                  ? "border-[#25D366] bg-[#E8F5E9]"
                  : `border-[#E1E3E5]`
              }`}
              style={{
                backgroundColor: selectedPlan?.id === plan.id ? "#E8F5E9" : plan.shade,
              }}
            >
              <div className="pt-6 px-6 pb-4">
                <div className="flex justify-end">
                  <div className="bg-[#F6F6F7] rounded-full px-4 py-1">
                    <p className="text-[#075E54] text-xs font-bold">{plan.name}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[#075E54] text-xl font-semibold mt-2">{plan.type}</p>
                  <p className="text-[#075E54] text-4xl font-extrabold">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-[#075E54] text-lg font-medium">{plan.credits}</p>
                  <p className="text-[#075E54] text-lg font-medium">{plan.users}</p>
                </div>
              </div>

              <div className="pt-6 px-6 pb-8">
                {plan.features.map((feature, index) => (
                  <p key={index} className="text-[#075E54] text-sm font-medium mt-2">
                    {feature}
                  </p>
                ))}

                {/* Button Section */}
                <div className="mt-6">
                  <button
                    className={`${
                      selectedPlan?.id === plan.id
                        ? "bg-[#25D366] cursor-not-allowed opacity-60"
                        : plan.buttonColor === "#25D366"
                        ? "bg-[#25D366] hover:bg-[#128C7E] active:scale-95 text-white shadow-md transform transition duration-300 ease-in-out"
                        : "bg-[#E1E3E5] hover:bg-[#B2B2B2] text-[#075E54]"
                    } rounded-lg py-3 px-6 w-full font-semibold text-sm`}
                    disabled={selectedPlan?.id === plan.id} // Disable button if this plan is selected
                    onClick={() => handleButtonClick(plan.id, plan.buttonText.toLowerCase())}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action message */}
        {actionMessage && (
          <div className="mt-8 p-4 bg-[#E1E3E5] rounded-lg text-[#075E54]">
            <p className="text-lg font-semibold">{actionMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
