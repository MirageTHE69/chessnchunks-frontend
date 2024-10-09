import { PageHeader } from "@/components/page-header";

export default function Page() {
  return (
    <div className="w-full p-8">
      {/* Page Header */}
      <PageHeader title="Hi CCCoach!!" />

      {/* Form Section */}
      <div className="mt-8">
        {/* Task Type Selection */}
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-white">
            Select the type of task to be assigned
          </h2>

          <div className="ml-5 space-x-6">
            {/* Quiz Radio Button */}
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="taskType"
                value="quiz"
                className="form-radio h-5 w-5 border border-white text-darkblue checked:bg-darkblue focus:ring-0"
              />
              <span className="ml-2 text-white">Quiz</span>
            </label>

            {/* Puzzle Radio Button */}
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="taskType"
                value="puzzle"
                className="form-radio h-5 w-5 border border-white text-darkblue checked:bg-darkblue focus:ring-0"
              />
              <span className="ml-2 text-white">Puzzle</span>
            </label>

            {/* Homework Radio Button */}
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="taskType"
                value="homework"
                className="form-radio h-5 w-5 border border-white text-darkblue checked:bg-darkblue focus:ring-0"
              />
              <span className="ml-2 text-white">Homework</span>
            </label>
          </div>
        </div>

        <form className="mt-6 w-[50%] space-y-6">
          {/* Select Batch */}
          <div className="flex items-center">
            <label className="text-gray-300 w-1/3">Select Batch</label>
            <select className="w-2/3 p-3 bg-gray-700 border border-gray-500 rounded text-white">
              <option>Select Batch</option>
            </select>
          </div>

          {/* Select Students */}
          <div className="flex items-center">
            <label className="text-gray-300 w-1/3">Select Students</label>
            <select className="w-2/3 p-3 bg-gray-700 border border-gray-500 rounded text-white">
              <option>Select Students</option>
            </select>
          </div>

          {/* Quiz Questions */}
          <div className="flex items-center">
            <label className="text-gray-300 w-1/3">Quiz Questions</label>
            <select className="w-2/3 p-3 bg-gray-700 border border-gray-500 rounded text-white">
              <option>Quiz Questions</option>
            </select>
          </div>

          {/* Start Date and End Date */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center w-1/2">
              <label className="text-gray-300 w-1/3">Start Date</label>
              <input
                type="date"
                className="w-2/3 p-3 bg-gray-700 border border-gray-500 rounded text-white"
                placeholder="dd-mm-yyyy"
              />
            </div>

            <div className="flex items-center w-1/2">
              <label className="text-gray-300 w-1/3">End Date</label>
              <input
                type="date"
                className="w-2/3 p-3 bg-gray-700 border border-gray-500 rounded text-white"
                placeholder="dd-mm-yyyy"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-1/2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
