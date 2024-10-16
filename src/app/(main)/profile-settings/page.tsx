"use client";

import { PageHeader } from "@/components/page-header";
import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import Label from "@/components/label";
import { useSession } from "next-auth/react";
import { useFetchProfileByIdQuery } from "@/api/userApi";

export default function Page() {
  const { data } = useSession();

  const userId = data?.user?.id;

  console.log("userId", userId);

  const {
    data: userData,
    isLoading,
    isError,
  } = useFetchProfileByIdQuery(userId, {
    skip: !userId,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    status: "",
  });

  console.log("userData", userData);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.profile?.firstName || "",
        middleName: userData.profile?.middleName || "",
        lastName: userData.profile?.lastName || "",
        email: userData.email || "",
        addressLine1: userData.profile?.addressLine1 || "",
        addressLine2: userData.profile?.addressLine2 || "",
        city: userData.profile?.city || "",
        state: userData.profile?.state || "",
        zipcode: userData.profile?.zipcode || "",
        country: userData.profile?.country || "",
        status: userData.status || "",
      });
    }
  }, [userData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full bg-gray-800 flex flex-col p-6">
      <PageHeader title="Profile Settings" />

      {/* Profile Card */}
      <div className="w-full bg-[#2A3042] text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          {/* Profile Picture Placeholder */}
          <div className="flex-shrink-0">
            <div className="bg-red-500 w-20 h-20 rounded-full" />
          </div>

          <div>
            {/* User's Full Name */}
            <h2 className="text-xl font-semibold">
              {userData?.profile?.firstName} {userData?.profile?.lastName}
            </h2>
            {userData?.profile?.middleName && (
              <h3 className="text-sm text-gray-400">
                {userData?.profile.middleName}
              </h3>
            )}
            <p className="text-sm text-gray-400">CCID: {userData?.code}</p>
          </div>
        </div>

        {/* Status Input */}
        <div className="mt-4">
          <Label htmlFor="status">Status</Label>
          <Input
            type="text"
            id="status"
            name="status"
            placeholder="Enter a status here..."
            className="bg-gray-800 text-gray-400 p-2 rounded w-full outline-none"
            value={formData.status}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-4 text-right text-xs text-gray-500">
          <p>Joined {new Date(userData?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="w-full bg-[#2A3042] text-white p-6 mt-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Bronze Member</h2>
          <button className="text-sm text-gray-400">Membership Plans</button>
        </div>

        <form className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="firstName" className="block w-1/4 text-sm">
              First Name
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="middleName" className="block w-1/4 text-sm">
              Middle Name
            </Label>
            <Input
              type="text"
              id="middleName"
              name="middleName"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="lastName" className="block w-1/4 text-sm">
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="email" className="block w-1/4 text-sm">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="addressLine1" className="block w-1/4 text-sm">
              Address Line 1
            </Label>
            <Input
              type="text"
              id="addressLine1"
              name="addressLine1"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.addressLine1}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="addressLine2" className="block w-1/4 text-sm">
              Address Line 2
            </Label>
            <Input
              type="text"
              id="addressLine2"
              name="addressLine2"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.addressLine2}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="city" className="block w-1/4 text-sm">
              City
            </Label>
            <select
              id="city"
              name="city"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.city}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a city</option>
              <option value="Vadodara">Vadodara</option>
            </select>
          </div>

          {/* State */}
          <div className="flex items-center space-x-4">
            <Label htmlFor="state" className="block w-1/4 text-sm">
              State
            </Label>
            <select
              id="state"
              name="state"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a state</option>
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="zipcode" className="block w-1/4 text-sm">
              Zipcode
            </Label>
            <Input
              type="text"
              id="zipcode"
              name="zipcode"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.zipcode}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="country" className="block w-1/4 text-sm">
              Country
            </Label>
            <select
              id="country"
              name="country"
              className="bg-gray-800 text-gray-400 p-2 rounded w-3/4 outline-none"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a country</option>
              <option value="India">India</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
