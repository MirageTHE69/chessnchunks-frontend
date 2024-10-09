import Link from 'next/link';
import React from 'react';

const ViewTaskCoach = () => {
    return (
        <div className="min-h-screen p-8 bg-gray-900 text-white flex flex-col items-left">
            <h1 className="text-2xl font-bold mb-4">Hi CCCoach!</h1>

            <div className="mb-4 w-full max-w-md">
                <p className="mb-1">Select the type of task to be assigned:</p>
                <div className="flex items-center mb-2">
                    <input type="radio" id="quiz" name="taskType" value="quiz" className="mr-2" />
                    <label htmlFor="quiz" className="mr-4">Quiz</label>
                    <input type="radio" id="puzzle" name="taskType" value="puzzle" className="mr-2" />
                    <label htmlFor="puzzle" className="mr-4">Puzzle</label>
                    <input type="radio" id="homework" name="taskType" value="homework" className="mr-2" />
                    <label htmlFor="homework">Homework</label>
                </div>
            </div>

            <div className="mb-4 w-full max-w-md">
                <label htmlFor="selectBatch" className="block mb-1">Select Batch:</label>
                <select id="selectBatch" className="w-full p-2 bg-gray-800 border border-gray-700 rounded">
                    <option value="">Select a batch</option>
                    <option value="batch1">Batch 1</option>
                    <option value="batch2">Batch 2</option>
                </select>
            </div>

            <div className="mb-4 w-full max-w-md">
                <label htmlFor="selectStudents" className="block mb-1">Select Students:</label>
                <select id="selectStudents" className="w-full p-2 bg-gray-800 border border-gray-700 rounded">
                    <option value="">Select students</option>
                    <option value="student1">Student 1</option>
                    <option value="student2">Student 2</option>
                </select>
            </div>

            <div className="mb-4 w-full max-w-md">
                <label htmlFor="quizQuestions" className="block mb-1">Quiz Questions:</label>
                <select id="quizQuestions" className="w-full p-2 bg-gray-800 border border-gray-700 rounded">
                    <option value="">Select quiz questions</option>
                    <option value="question1">Question 1</option>
                    <option value="question2">Question 2</option>
                </select>
            </div>

            <div className="flex mb-4 w-full max-w-md">
                <div className="mr-2 w-1/2">
                    <label htmlFor="startDate" className="block mb-1">Start Date:</label>
                    <input type="date" id="startDate" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
                </div>
                <div className="w-1/2">
                    <label htmlFor="endDate" className="block mb-1">End Date:</label>
                    <input type="date" id="endDate" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
                </div>
            </div>

            <div className="mb-4 w-full max-w-md"> {/* Keeping the button within the content flow */}
                <Link href="/view-task-student">  <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm w-full px-4 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> {/* Full width for button */}
                    Create Quiz
                </button>
                </Link>
            </div>
        </div>
    );
};

export default ViewTaskCoach;
