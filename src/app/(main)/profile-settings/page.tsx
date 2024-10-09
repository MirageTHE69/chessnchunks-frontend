"use client";  // Add this line to make it a Client Component

import { PageHeader } from "@/components/page-header";

export default function Page() {
  return (
    <div className="w-full bg-gray-800 flex flex-col p-6 ">
      <PageHeader title="Profile settings" />

      {/* Profile Card */}
      <div className="w-full bg-[#2A3042] text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          {/* Red Circle Box */}
          <div className="flex-shrink-0">
            <div className="bg-red-500 w-20 h-20 rounded-full" />
          </div>

          <div>
            {/* Name and CCID */}
            <h2 className="text-xl font-semibold">CCstudent</h2>
            <h3 className="text-sm text-gray-400">Sakshi Vaidya</h3>
            <p className="text-sm text-gray-400">CCID: 123456</p>
          </div>
        </div>

        {/* Status and Join Date */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter a status here..."
            className="bg-gray-800 text-gray-400 p-2 rounded w-full outline-none"
          />
        </div>

        <div className="mt-4 text-right text-xs text-gray-500">
          <p>Joined 2nd September 2024</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full bg-[#2A3042] text-white p-6 mt-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Bronze Member</h2>
          <button className="text-sm text-gray-400">Membership Plans</button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Username */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">Username</label>
            <input
              type="text"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              defaultValue="CCstudent"
            />
          </div>

          {/* First Name */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">First name</label>
            <input
              type="text"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              defaultValue="Sakshi"
            />
          </div>

          {/* Middle Name */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">Middle name</label>
            <input
              type="text"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              defaultValue="Chirag"
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">Last name</label>
            <input
              type="text"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              defaultValue="Vaidya"
            />
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">Email address</label>
            <input
              type="email"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              defaultValue="sakshi.v@n10tech.com"
            />
          </div>

          {/* Address Line 1 */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">Address line 1</label>
            <input
              type="text"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              defaultValue="Shivalik Shilp"
            />
          </div>

          {/* Address Line 2 */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">Address line 2</label>
            <input
              type="text"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              defaultValue="Shivalik Shilp"
            />
          </div>

          {/* City */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">City</label>
            <select className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none">
              <option value="Vadodara">Vadodara</option>
            </select>
          </div>

          {/* State */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">State</label>
            <select className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none">
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>

          {/* Zipcode */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">Zipcode</label>
            <input
              type="text"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              defaultValue="390007"
            />
          </div>

          {/* Country */}
          <div className="flex items-center space-x-4">
            <label className="block w-1/4 text-sm">Country</label>
            <select className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none">
              <option value="India">India</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
