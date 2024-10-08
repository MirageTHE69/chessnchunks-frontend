"use client";  // Add this line to make it a Client Component

import { PageHeader } from "@/components/page-header";
import { useState } from "react";

type Props = {};

export default function Page(props: Props) {
  const [playSounds, setPlaySounds] = useState(false);
  const [highlightMoves, setHighlightMoves] = useState(false);
  const [hints, setHints] = useState(false);

  return (
    <div className="w-full p-6">
      {/* Page Header */}
      <div>
        <PageHeader title="Game Settings" 
        description=" "/>
      </div>
      
      {/* Settings Form aligned to the left */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg mt-6 w-[40%]">
        <form className="space-y-4">
          {/* Pieces */}
          <div className="flex items-center justify-between">
            <label className="text-gray-300">Pieces</label>
            <input
              type="text"
              defaultValue="metal"
              className="bg-gray-700 text-gray-300 p-2 rounded w-48 outline-none"
            />
          </div>

          {/* Board */}
          <div className="flex items-center justify-between">
            <label className="text-gray-300">Board</label>
            <input
              type="text"
              defaultValue="pink"
              className="bg-gray-700 text-gray-300 p-2 rounded w-48 outline-none"
            />
          </div>

          {/* Difficulty */}
          <div className="flex items-center justify-between">
            <label className="text-gray-300">Difficulty</label>
            <input
              type="text"
              defaultValue="intermediate"
              className="bg-gray-700 text-gray-300 p-2 rounded w-48 outline-none"
            />
          </div>

          {/* Piece Notation */}
          <div className="flex items-center justify-between">
            <label className="text-gray-300">Piece Notation</label>
            <input
              type="text"
              defaultValue="text"
              className="bg-gray-700 text-gray-300 p-2 rounded w-48 outline-none"
            />
          </div>

          {/* Win Celebration */}
          <div className="flex items-center justify-between">
            <label className="text-gray-300">Win Celebration</label>
            <input
              type="text"
              defaultValue="confetti"
              className="bg-gray-700 text-gray-300 p-2 rounded w-48 outline-none"
            />
          </div>

          {/* Sound Theme */}
          <div className="flex items-center justify-between">
            <label className="text-gray-300">Sound Theme</label>
            <input
              type="text"
              defaultValue="metal"
              className="bg-gray-700 text-gray-300 p-2 rounded w-48 outline-none"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center justify-between">
            <label className="text-gray-300">Play sounds</label>
            <input
              type="checkbox"
              checked={playSounds}
              onChange={() => setPlaySounds(!playSounds)}
              className="toggle-checkbox"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-300">Highlight moves</label>
            <input
              type="checkbox"
              checked={highlightMoves}
              onChange={() => setHighlightMoves(!highlightMoves)}
              className="toggle-checkbox"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-300">Hints</label>
            <input
              type="checkbox"
              checked={hints}
              onChange={() => setHints(!hints)}
              className="toggle-checkbox"
            />
          </div>

          {/* Save Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
