"use client";

import { useState } from "react";

const StudentVerification = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-gray-400">Sign-up to continue</p>
        </div>

        <div className="flex justify-center mb-8">
          <label htmlFor="profileImage" className="cursor-pointer">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-700 rounded-full flex justify-center items-center">
                <i className="text-3xl">📷</i>
              </div>
            )}
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <form className="space-y-6">
          <div className="relative">
            <label className="block text-sm text-white mb-2">User Role</label>
            <input
              type="text"
              value="Student"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>

          {[
            { label: 'Chess in Chums user ID', placeholder: 'Enter Check-in Chums user ID' },
            { label: 'First Name', placeholder: 'Enter first name' },
            { label: 'Middle Name', placeholder: 'Enter middle name' },
            { label: 'Last Name', placeholder: 'Enter last name' },
            { label: 'Email', placeholder: 'Enter email', type: 'email' },
            { label: 'Parent Name', placeholder: 'Enter parent\'s name' },
            { label: 'Parent Email ID', placeholder: 'Enter parent\'s email ID', type: 'email' },
            { label: 'Phone Number', placeholder: 'Enter phone number', type: 'tel' },
            { label: 'Address line 1', placeholder: 'Enter address line 1' },
            { label: 'Address line 2', placeholder: 'Enter address line 2' },
            { label: 'City', placeholder: 'Enter city' },
            { label: 'State', placeholder: 'Enter state' },
            { label: 'Country', placeholder: 'Enter country' },
            { label: 'USCF ID', placeholder: 'Enter USCF ID' },
            { label: 'LiChess ID', placeholder: 'Enter LiChess ID' },
            { label: 'Chess.com ID', placeholder: 'Enter Chess.com ID' },
          ].map((field, index) => (
            <div key={index} className="relative">
              <label className="block text-sm text-white mb-2">{field.label}</label>
              <input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="relative">
            <label className="block text-sm text-white mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2 text-gray-400"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">Date of Birth</label>
            <div className="relative">
              <input
                type="date"
                className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <i className="absolute right-3 top-2 text-white">🎁</i>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-white">MFA</label>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={mfaEnabled}
                  onChange={() => setMfaEnabled(!mfaEnabled)}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentVerification;
