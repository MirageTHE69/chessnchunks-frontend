"use client";

import { useSignUpMutation } from "@/api/userApi";
import { useState } from "react";
import { Button } from "../button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const StudentVerification = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const router = useRouter();

  const [allInputs, setAllInputs] = useState({
    dob: "",
    age: null as number | null,
    chessInChunksUserId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    parentName: "",
    parentEmail: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateValue: "",
    country: "",
    uscfId: "",
    liChessId: "",
    chessComId: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dob") {
      let computedAge = null;
      if (value) {
        const today = new Date();
        const birthDate = new Date(value);
        computedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          computedAge--;
        }
      }
      setAllInputs((prevState) => ({
        ...prevState,
        dob: value,
        age: computedAge,
      }));
    } else {
      setAllInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signUp(allInputs);

      if (data) {
        toast.success("Registered successfully!", {
          description: "You can now log in with your new account.",
        });
        setAllInputs({
          dob: "",
          age: null,
          chessInChunksUserId: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          parentName: "",
          parentEmail: "",
          phoneNumber: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          stateValue: "",
          country: "",
          uscfId: "",
          liChessId: "",
          chessComId: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/login");
      }
    } catch (error) {
      toast.error("Registration failed!", {
        description: "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-xl">
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block text-sm text-white mb-2">User Role</label>
            <input
              type="text"
              value="Student"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                name="dob"
                className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={allInputs.dob}
                onChange={handleChange}
              />
              <i className="absolute right-3 top-2 text-white">🎁</i>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">
              Chess in Chunks user ID
            </label>
            <input
              type="text"
              name="chessInChumsUserId"
              placeholder="Enter Chess in Chunks user ID"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={allInputs.chessInChunksUserId}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={allInputs.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">Middle Name</label>
            <input
              type="text"
              name="middleName"
              placeholder="Enter middle name"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={allInputs.middleName}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={allInputs.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={allInputs.email}
              onChange={handleChange}
            />
          </div>

          {allInputs.age !== null && allInputs.age < 18 && (
            <>
              <div className="relative">
                <label className="block text-sm text-white mb-2">
                  Parent Name
                </label>
                <input
                  type="text"
                  name="parentName"
                  placeholder="Enter parent's name"
                  className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={allInputs.parentName}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <label className="block text-sm text-white mb-2">
                  Parent Email ID
                </label>
                <input
                  type="email"
                  name="parentEmail"
                  placeholder="Enter parent's email ID"
                  className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={allInputs.parentEmail}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="relative">
            <label className="block text-sm text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter phone number"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={allInputs.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              name="addressLine1"
              placeholder="Enter address line 1"
              className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={allInputs.addressLine1}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={allInputs.password}
                onChange={handleChange}
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
            <label className="block text-sm text-white mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full bg-transparent text-white border-white border px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={allInputs.confirmPassword}
                onChange={handleChange}
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
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentVerification;
