import { SummaryPopupProps } from "../types/chat";
import React from "react";
const SummaryPopup:React.FC<SummaryPopupProps> = ({ showSummaryPopup, setShowSummaryPopup, currentSummary, postToMemoryWall }) => {
  if (!showSummaryPopup) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 max-w-md w-full border border-white/20">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Doubt Solved! 🎉</h3>
          <p className="text-gray-300 text-sm">{currentSummary}</p>
        </div>
        <div className="space-y-3">
          <button onClick={() => setShowSummaryPopup(false)} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200">
            Get Summary
          </button>
          <button onClick={postToMemoryWall} className="w-full py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-200">
            📌 Post to Memory Wall
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPopup;