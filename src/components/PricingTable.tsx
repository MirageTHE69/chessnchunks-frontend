import React from 'react';

const PricingTable: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-8 py-10">
      {/* Introductory Card */}
      <div className="bg-gray-900 text-white rounded-lg p-8 text-center w-64 shadow-lg transition-transform transform hover:-translate-y-3 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold">Introductory</h2>
        <p className="text-4xl font-bold mt-4">$10/month</p>
        <p className="text-sm text-gray-400 mt-2">Billed as $3455 a year</p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
        </ul>
        <button className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors">
          SELECT PLAN
        </button>
      </div>

      {/* Personal Card */}
      <div className="bg-gray-900 text-white rounded-lg p-8 text-center w-64 shadow-lg transition-transform transform hover:-translate-y-3 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold">Personal</h2>
        <p className="text-4xl font-bold mt-4">$20/month</p>
        <p className="text-sm text-gray-400 mt-2">Billed as $3455 a year</p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
        </ul>
        <button className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors">
          SELECT PLAN
        </button>
      </div>

      {/* Professional Card */}
      <div className="bg-gray-900 text-white rounded-lg p-8 text-center w-64 shadow-lg transition-transform transform hover:-translate-y-3 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold">Professional</h2>
        <p className="text-4xl font-bold mt-4">$20/month</p>
        <p className="text-sm text-gray-400 mt-2">Billed as $3455 a year</p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
          <li>gaming experience</li>
        </ul>
        <button className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors">
          SELECT PLAN
        </button>
      </div>
    </div>
  );
};

export default PricingTable;
