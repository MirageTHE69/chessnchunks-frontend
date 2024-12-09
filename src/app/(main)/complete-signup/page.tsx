"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronRight, ChevronLeft, Check, CreditCard } from "lucide-react";
import { useFetchSignUpByIdQuery } from "@/api/userSignupApi";
import { UserSignUp } from "@/types/userSignUp";
import { useSearchParams } from "next/navigation";
import { useFetchAcademyProgramsQuery } from "@/api/academyProgramApi";

interface Plan {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: "MONTHLY" | "SEASONAL";
  features?: any;
}

type StepStatus = "upcoming" | "current" | "complete";

const steps = [
  { id: 1, name: "Profile Review" },
  { id: 2, name: "Plan Selection" },
  { id: 3, name: "Payment" },
  { id: 4, name: "Confirmation" },
];

export default function CompleteSignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const {
    data: userData,
    isLoading: isLoadingSignup,
    error: signupError,
  } = useFetchSignUpByIdQuery(id, {
    skip: !id || !token,
  });

  const {
    data: plans,
    isLoading: isLoadingPrograms,
    error: programsError,
  } = useFetchAcademyProgramsQuery(userData?.academyId ?? "", {
    skip: !userData?.academyId,
  });

  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const getStepStatus = (stepId: number): StepStatus => {
    if (stepId < currentStep) return "complete";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/payment/process", {
        method: "POST",
        body: JSON.stringify({
          planId: selectedPlan.id,
          signupId: userData?.signupId,
        }),
      });

      if (response.ok) {
        setCurrentStep(4);
        toast.success("Payment successful!");
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      if (userData.signupStage === "PAYMENT") {
        setCurrentStep(3);
      } else if (userData.signupStage === "POST_ACTIVATION") {
        setCurrentStep(4);
      }
    }
  }, [userData]);

  const renderProfileSection = (
    title: string,
    items: { label: string; value: string | undefined }[]
  ) => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-primary">{title}</h4>
      <div className="grid grid-cols-2 gap-4">
        {items.map(({ label, value }, index) => (
          <div key={index} className="space-y-1">
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-white font-medium">{value || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white">
              Review Your Profile
            </h3>

            {renderProfileSection("Personal Information", [
              { label: "First Name", value: userData?.firstName },
              { label: "Middle Name", value: userData?.middleName },
              { label: "Last Name", value: userData?.lastName },
              { label: "Email", value: userData?.email },
              {
                label: "Date of Birth",
                value: userData?.dateOfBirth
                  ? new Date(userData.dateOfBirth).toLocaleDateString()
                  : undefined,
              },
              { label: "Phone Number", value: userData?.phoneNumber },
            ])}

            {(userData?.parentName || userData?.parentEmail) &&
              renderProfileSection("Parent Information", [
                { label: "Parent Name", value: userData?.parentName },
                { label: "Parent Email", value: userData?.parentEmail },
              ])}

            {renderProfileSection("Address Information", [
              { label: "Address Line 1", value: userData?.addressLine1 },
              { label: "Address Line 2", value: userData?.addressLine2 },
              { label: "City", value: userData?.city },
              { label: "State", value: userData?.state },
              { label: "Country", value: userData?.country },
              { label: "ZIP Code", value: userData?.zipCode },
            ])}

            {renderProfileSection("Chess Profile", [
              { label: "Chess.com ID", value: userData?.chessComId },
              { label: "Lichess ID", value: userData?.lichessId },
              { label: "USCF ID", value: userData?.uscfId },
              { label: "CIC ID", value: userData?.cicId },
            ])}

            {renderProfileSection("Registration Status", [
              { label: "Signup ID", value: userData?.signupId },
              { label: "Status", value: userData?.signupStatus },
              { label: "Role", value: userData?.userRole },
              { label: "Stage", value: userData?.signupStage },
              { label: "Payment Status", value: userData?.paymentStatus },
            ])}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              Select Your Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans?.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedPlan?.id === plan.id
                      ? "border-blue-500 bg-black-secondary"
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                  onClick={() => handlePlanSelection(plan)}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-white">
                      {plan.name}
                    </h4>
                    {selectedPlan?.id === plan.id && (
                      <Check className="text-blue-500 h-5 w-5" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">
                    ${plan.price}
                    <span className="text-sm text-gray-400">
                      /{plan.duration.toLowerCase()}
                    </span>
                  </p>
                  <p className="text-gray-400 text-sm">{plan.type}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              Payment Details
            </h3>
            {selectedPlan && (
              <div className="bg-black-secondary p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">
                    {selectedPlan.name}
                  </h4>
                  <p className="text-2xl font-bold text-white">
                    ${selectedPlan.price}
                  </p>
                </div>
                <p className="text-gray-400">
                  {selectedPlan.duration.toLowerCase()} billing
                </p>
              </div>
            )}
            <div className="space-y-4">
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <CreditCard className="h-5 w-5" />
                )}
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-500/20 p-3">
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Welcome to Chess in Chunks!
            </h3>
            <p className="text-gray-400">
              Your account has been successfully created and activated.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black-primary">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white text-center">
            Complete Your Registration
          </h2>
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={`relative ${
                    index !== steps.length - 1 ? "pr-20" : ""
                  }`}
                >
                  {index !== steps.length - 1 && (
                    <div
                      className="absolute top-5 w-full h-0.5"
                      style={{
                        background: `linear-gradient(to right, ${
                          step.id < currentStep
                            ? "#3B82F6 100%"
                            : "rgb(75, 85, 99) 0%"
                        })`,
                      }}
                    />
                  )}
                  <div className="relative flex flex-col items-center">
                    <span
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                        getStepStatus(step.id) === "complete"
                          ? "bg-blue-600 border-blue-600"
                          : getStepStatus(step.id) === "current"
                          ? "border-blue-600 bg-black-primary"
                          : "border-gray-600 bg-black-primary"
                      }`}
                    >
                      {getStepStatus(step.id) === "complete" ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <span
                          className={
                            getStepStatus(step.id) === "current"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }
                        >
                          {step.id}
                        </span>
                      )}
                    </span>
                    <span
                      className={`mt-2 text-sm ${
                        getStepStatus(step.id) === "current"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="mt-12 bg-black-secondary rounded-xl p-8">
          {renderStepContent()}
        </div>

        {currentStep !== 4 && (
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            {currentStep !== 3 && (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
                disabled={currentStep === 2 && !selectedPlan}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
