"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";
import { Button } from "@/components/button2";

const StudentVerificationPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const batchId = searchParams.get("batchId");
  const token = searchParams.get("token");
  const name = searchParams.get("name");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const VALID_STUDENT_VERIFICATION_TYPES = [
    "BATCH_STUDENT",
    "USER_INVITATION",
    "BATCH_COACH",
  ];
  const isValidType =
    type && VALID_STUDENT_VERIFICATION_TYPES.includes(type as string);

  useEffect(() => {
    const verifyInvitation = async () => {
      if (!isValidType || !token) {
        setError("Invalid or missing verification parameters.");
        setLoading(false);
        return;
      }

      try {
        let endpoint = "";
        if (type === "BATCH_COACH") {
          endpoint = "coach/verify-coach";
        } else {
          endpoint = "student/verify-student";
        }

        const response = await fetch(
          `http://localhost:5000/api/v1/${endpoint}?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage(
            data?.message || "Invitation accepted successfully!"
          );
        } else {
          setError(data.message || "Failed to accept the invitation.");
        }
      } catch (err: any) {
        setError(
          err.message || "An unexpected error occurred during verification."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyInvitation();
  }, [type, batchId, token, isValidType, name]);

  const MESSAGE = (() => {
    switch (type) {
      case "BATCH_STUDENT":
        return (
          <>
            <p>
              Hello{" "}
              <span className="font-bold text-white">{name || "Student"}</span>,
              you have been invited as a student to join the batch{" "}
              <span className="font-bold text-white">{batchId}</span>.
            </p>
            <p className="mt-2">
              We are thrilled to have you join us and look forward to your
              learning journey.
            </p>
          </>
        );
      case "BATCH_COACH":
        return (
          <>
            <p>
              Hello{" "}
              <span className="font-bold text-white">{name || "Coach"}</span>,
              you have been invited as a coach to join the batch{" "}
              <span className="font-bold text-white">{batchId}</span>.
            </p>
            <p className="mt-2">
              Welcome aboard! We look forward to your contribution in guiding
              our students.
            </p>
          </>
        );
      default:
        return (
          <>
            <p>
              Hello{" "}
              <span className="font-bold text-white">{name || "User"}</span>,
              you have successfully accepted the invitation.
            </p>
          </>
        );
    }
  })();

  if (!isValidType) {
    return (
      <main className="h-screen flex items-center justify-center w-full p-4">
        <div className="max-w-md w-full rounded-lg shadow-2xl shadow-black/10 overflow-hidden p-6 mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 h-20 w-20 rounded-full flex items-center justify-center">
                <MdErrorOutline className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <h4 className="text-red-700 text-xl font-semibold">
              Invalid Invitation Type
            </h4>
            <p className="text-gray-600 text-sm mt-4">
              The invitation link is invalid or the invitation type is not
              supported.
            </p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex items-center justify-center w-full p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-2xl shadow-black/10 overflow-hidden p-6 mx-auto">
        <div className="text-center">
          {loading ? (
            <div className="flex flex-col items-center">
              <AiOutlineLoading3Quarters className="h-6 w-6 text-white animate-spin mb-4" />
              <p className="text-gray-600 text-sm">Accepting Invitation...</p>
            </div>
          ) : error ? (
            <div>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 h-20 w-20 rounded-full flex items-center justify-center">
                  <MdErrorOutline className="h-10 w-10 text-red-600" />
                </div>
              </div>
              <h4 className="text-red-700 text-xl font-semibold">
                Verification Failed
              </h4>
              <p className="text-gray-600 text-sm mt-4">{error}</p>
              <Button onClick={() => router.push("/")} className="mt-4">
                Back to Home
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center">
                  <IoMailOpenOutline className="h-8 w-8 text-white" />
                </div>
              </div>
              <h4 className="text-white text-xl font-semibold">Success!</h4>
              <div className="text-white text-sm my-4">{MESSAGE}</div>{" "}
              <Button onClick={() => router.push("/")} className="mt-4">
                Back to Home
              </Button>
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="mt-4"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default StudentVerificationPage;
