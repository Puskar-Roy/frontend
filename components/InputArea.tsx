import React from "react";
import { InputAreaProps } from "../types/chat";

const InputArea: React.FC<InputAreaProps> = ({
  inputText,
  setInputText,
  handleSendMessage,
  toggleRecording,
  isRecording,
}) => {
  return (
    <div className=" backdrop-blur-md   px-2 sm:px-4 py-3">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
          {/* Input Field */}
          <div className="flex-1 relative w-full">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your doubt here... and double-click to add to memory-wall"
              className="w-full px-4 py-[1.4rem] bg-[#1a1a1a]/70 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            />
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
            )}
          </div>

          {/* Optional Microphone Button (Uncomment to use) */}
          {/*
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          */}

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-3 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
