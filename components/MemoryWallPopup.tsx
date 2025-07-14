import React from "react";
import { MemoryWallPopupProps } from "../types/chat";

const MemoryWallPopup:React.FC<MemoryWallPopupProps> = ({ showMemoryWall, setShowMemoryWall }) => {
  if (!showMemoryWall) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 max-w-md w-full border border-white/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Added to Memory Wall! 📝</h3>
          <p className="text-gray-300 text-sm mb-6">Your solved doubt has been saved for future reference</p>
          <button onClick={() => setShowMemoryWall(false)} className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200">
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};


export default MemoryWallPopup;