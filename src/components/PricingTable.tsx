// components/PricingTable.tsx
"use client";
import React, { useState } from 'react';

const PricingTable: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="full min-w-max bg-[#1E2538] text-white flex items-center">
      {/* Container with mx-auto */}
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          {/* Left Text */}
          <div>
            <h2 className="text-xl font-bold">Choose your Plan</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Elevate your playing experience, Select the plan that is right for you
            </p>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Create Program
            </button>
            {/* Billing Cycle Toggle */}
            <div className="flex items-center bg-[#1B2135] rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-4 rounded-lg ${billingCycle === 'monthly' ? 'bg-[#2F3A58] text-white' : 'text-gray-400'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`py-2 px-4 rounded-lg ${billingCycle === 'yearly' ? 'bg-[#2F3A58] text-white' : 'text-gray-400'}`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Section */}
        <div className="flex justify-center space-x-6">
          {[
            { title: 'Introductory', price: 10 },
            { title: 'Personal', price: 20 },
            { title: 'Professional', price: 20 },
          ].map((plan, idx) => (
            <div
              key={idx}
              className="bg-[#1B2135] rounded-lg shadow-lg p-6 text-white transition-transform transform hover:scale-105 cursor-pointer w-64"
            >
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              <p className="text-3xl font-bold mt-4">
                ${plan.price}
                <span className="text-lg font-normal">/month</span>
              </p>
              <p className="text-gray-400 mt-2">Billed as $3455 a year</p>
              <ul className="mt-6 space-y-2">
                {[
                  'gaming experience',
                  'gaming experience',
                  'gaming experience',
                  'gaming experience',
                  'gaming experience',
                ].map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center space-x-2">
                    <span className="text-green-400">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 bg-[#2F3A58] hover:bg-[#3b4a6d] text-white py-2 px-4 rounded-lg w-full">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
