import React from "react";
import { PageHeader } from "@/components/page-header";

const PricingTablePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-8 bg-gray-900 text-white">
      <PageHeader title="Payment Method" />
      
      <div className=" mx-auto mt-10 grid grid-cols-2 gap-8">
        {/* Payment Options Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          {/* Tabs for payment options */}
          <div className="flex space-x-4 mb-6 border-b border-gray-600">
            <button className="py-2 px-4 text-white border-b-2 border-blue-500">Credit Card</button>
            <button className="py-2 px-4 text-gray-400">PayPal</button>
            <button className="py-2 px-4 text-gray-400">QR</button>
            <button className="py-2 px-4 text-gray-400">Other</button>
          </div>

          {/* Credit Card Form */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Card Number</label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
                placeholder="2121 2121 2121 2121"
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-400 mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
                  placeholder="121"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-400 mb-2">Expiry</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
                  placeholder="MM/YY"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Name on the Card</label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
                placeholder="Subhash Chandra Bose"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
            >
              Pay Now
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          
          <div className="mb-2 flex justify-between">
            <span>Total Amount</span>
            <span>$200</span>
          </div>

          <div className="mb-2 flex justify-between">
            <span>Taxes</span>
            <span>$200</span>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="text"
              className="p-2 w-full rounded-md bg-gray-700 text-white border border-gray-600"
              placeholder="Apply Discount"
            />
            <button className="ml-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-md">
              <span className="material-icons">settings</span>
            </button>
          </div>

          <div className="border-t border-gray-600 pt-4 flex justify-between font-bold text-lg">
            <span>Total Payable Amount</span>
            <span>$400</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTablePage;
