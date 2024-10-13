"use client"; // Marking this as a Client Component

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { Button } from "../../../components/button2"; // Assuming you have a Button component
import { IoMailOpenOutline } from "react-icons/io5"; // Make sure you import IoMailOpenOutline if you're using it

const StudentVerificationPage = () => {
  // Hardcoded values for testing the design
  const type = "BATCH_STUDENT"; // Example type
  const name = "Sample Batch"; // Example name
  const loading = false; // Change to true to see loading state
  const error = false; // Change to true to see error state

  // Valid verification types
  const VALID_STUDENT_VERIFICATION_TYPES = ["BATCH_STUDENT", "USER_INVITATION"];
  const isValidType = VALID_STUDENT_VERIFICATION_TYPES.includes(type);

  const MESSAGE =
    type === "BATCH_STUDENT"
      ? `You have been invited as a student to join the batch <span class="font-bold text-white">${name}</span>. 
      <p class="mt-2">We are thrilled to have you join us and look forward to your learning journey.</p>`
      : `You have successfully accepted the invitation.`;

  if (!isValidType) {
    return (
      <main className="h-screen flex items-center justify-center w-full p-4">
        <div className="max-w-md w-full  rounded-lg shadow-2xl shadow-black/10 overflow-hidden p-6 mx-auto">
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
            <Button className="mt-4">Back to Home</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex items-center justify-center w-full p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-2xl shadow-black/10 overflow-hidden p-6 mx-auto">
        <div className="text-center">
          {loading && !error ? (
            <div className="flex flex-col items-center">
              <AiOutlineLoading3Quarters className="h-6 w-6 text-white animate-spin mb-4" />
              <p className="text-gray-600 text-sm">Accepting Invitation...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center">
                  <IoMailOpenOutline className="h-8 w-8 text-white" />
                </div>
              </div>
              <h4 className="text-white text-xl font-semibold">Success!</h4>
              <p
                className="text-white text-sm my-4"
                dangerouslySetInnerHTML={{ __html: MESSAGE }}
              />
              <Button className="mt-4">Back to Home</Button>
              <Button className="mt-4" variant="outline">
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default StudentVerificationPage;
