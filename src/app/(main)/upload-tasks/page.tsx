import { PageHeader } from "@/components/page-header";

type Props = {};

export default function Page(props: Props) {
  return (
    <div className="w-full p-8">
      <PageHeader title="Hi CCCoach!!" />

      {/* Form Section */}
      <div className="mt-8 flex">
        <h2 className="text-lg font-semibold">Select the type of task to be assigned</h2>

        <div className="ml-5 space-x-6">
          {/* Quiz Radio Button */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="taskType"
              value="quiz"
              className="form-radio h-5 w-5 border border-white text-transparent checked:bg-darkblue checked:border-darkblue focus:ring-0"
            />
            <span className="ml-2 text-white-700">Quiz</span>
          </label>

          {/* Puzzle Radio Button */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="taskType"
              value="puzzle"
              className="form-radio h-5 w-5 border border-white text-transparent checked:bg-darkblue checked:border-darkblue focus:ring-0"
            />
            <span className="ml-2 text-white-700">Puzzle</span>
          </label>

          {/* Homework Radio Button */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="taskType"
              value="homework"
              className="form-radio h-5 w-5 border border-white text-transparent checked:bg-darkblue checked:border-darkblue focus:ring-0"
            />
            <span className="ml-2 text-white-700">Homework</span>
          </label>

        </div>
        <form className="mt-6 space-y-6">
          <div>
            <label className="block text-gray-300">Select Batch</label>
            <select className="w-full mt-2 p-2 bg-transparent border border-gray-600 rounded text-gray-300">
              <option>Select Batch</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300">Select Students</label>
            <select className="w-full mt-2 p-2 bg-transparent border border-gray-600 rounded text-gray-300">
              <option>Select Students</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300">Quiz Questions</label>
            <select className="w-full mt-2 p-2 bg-transparent border border-gray-600 rounded text-gray-300">
              <option>Quiz Questions</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-gray-300">Start Date</label>
              <input
                type="date"
                className="w-full mt-2 p-2 bg-transparent border border-gray-600 rounded text-gray-300"
              />
            </div>

            <div className="w-full">
              <label className="block text-gray-300">End Date</label>
              <input
                type="date"
                className="w-full mt-2 p-2 bg-transparent border border-gray-600 rounded text-gray-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
