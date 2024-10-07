import React from "react";
import { PageHeader } from "@/components/page-header";

const AccountMembershipPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-8 bg-gray-900 text-white">
      {/* Page header with title and description */}
      <PageHeader title="Account" description="Membership Details" />

      <div className=" mx-auto mt-8">
        {/* Membership information */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="mb-2">
            <span className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full">
              Member since Sep 2024
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-600 pt-4">
            <h3 className="text-lg font-semibold">Premium Plan</h3>
            <button className="text-gray-400 hover:text-white flex items-center">
              Manage Membership
              <span className="ml-2">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-4">Quick Links</h4>

          {/* Quick Link List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-t border-gray-600 pt-4">
              <span className="text-base">Change Plan</span>
              <span className="text-gray-400">&rarr;</span>
            </div>

            <div className="flex justify-between items-center border-t border-gray-600 pt-4">
              <span className="text-base">Transaction History</span>
              <span className="text-gray-400">&rarr;</span>
            </div>

            <div className="flex justify-between items-center border-t border-gray-600 pt-4">
              <span className="text-base">Receipts and Reports</span>
              <span className="text-gray-400">&rarr;</span>
            </div>

            {/* Toggle for Auto-Pay */}
            <div className="flex justify-between items-center border-t border-gray-600 pt-4">
              <span className="text-base">Auto-Pay</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMembershipPage;
