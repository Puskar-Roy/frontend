import React from "react";
import { SidebarProps } from "../types/chat"; // Make sure SidebarProps includes handleSelectChat
import Link from "next/link";
import { Presentation, UserRoundPen, Wallpaper } from "lucide-react";

// Add `handleSelectChat` to your SidebarProps type definition
// interface SidebarProps {
//   ...
//   handleSelectChat: (id: number) => void;
// }

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  handleNewChat,
  chatHistory,
  handleRouteChange,
  activeRoute,
  handleSelectChat, // Destructure the new prop
}) => {
  return (
    <>
      <style>
        {`
          /* For Webkit browsers (Chrome, Safari, Edge) */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px; /* Width of the scrollbar */
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent; /* Make the track invisible */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2); /* A subtle white/gray color */
            border-radius: 10px; /* Rounded corners for the thumb */
            border: 2px solid transparent; /* Creates padding around thumb */
            background-clip: padding-box;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.4); /* Make it more visible on hover */
          }

          /* For Firefox */
          .custom-scrollbar {
            scrollbar-width: thin; /* "auto" or "thin" */
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent; /* thumb and track color */
          }
        `}
      </style>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col h-full">
          {/* ... (Sidebar Header and New Chat Button remain the same) ... */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <Link href="/home">
              <h2 className="text-xl font-bold text-white">
                AI Study Assistant
              </h2>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="font-medium">New Chat</span>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Recent Chats
            </h3>
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  // Add the onClick handler here
                  onClick={() => handleSelectChat(chat.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                    chat.active
                      ? "bg-white/10 border border-white/20"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{chat.time}</p>
                    </div>
                    {/* ... (Action buttons remain the same) ... */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ... (Navigation Menu remains the same) ... */}
          <div className="p-4 border-t border-white/10">
            <div className="space-y-2">
              <Link href={"/memory-wall"}
                // onClick={() => handleRouteChange("memory-wall")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${activeRoute === "profile" ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
              >
                <Wallpaper height={20} width={20} />
                <span>Memory Wall</span>
              </Link>
              <Link href={"/meet"}
                // onClick={() => handleRouteChange("meet")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${activeRoute === "settings" ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
              >
                <Presentation height={20} width={20} />
                <span>Meet</span>
              </Link>
              <Link href={"/profile"}
                // onClick={() => handleRouteChange("meet")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${activeRoute === "settings" ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
              >
                <UserRoundPen height={20} width={20} />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => handleRouteChange("logout")}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;