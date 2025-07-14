"use client";
import { useState } from "react";

interface NavbarWithSidebarProps {
  onRouteChange?: (route: string) => void;
}

export default function NavbarWithSidebar({
  onRouteChange,
}: NavbarWithSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("chat");

  const chatHistory = [
    {
      id: 1,
      title: "Physics - Newton's Laws",
      time: "2 hours ago",
      active: true,
    },
    {
      id: 2,
      title: "Math - Calculus Integration",
      time: "1 day ago",
      active: false,
    },
    {
      id: 3,
      title: "Chemistry - Organic Reactions",
      time: "3 days ago",
      active: false,
    },
    {
      id: 4,
      title: "Biology - Cell Division",
      time: "1 week ago",
      active: false,
    },
  ];

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    setSidebarOpen(false);
    onRouteChange?.(route);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Sidebar content */}
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">AI Study Assistant</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg"
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

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Recent Chats
            </h3>
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    chat.active
                      ? "bg-white/10 border border-white/20"
                      : "hover:bg-white/5"
                  }`}
                >
                  <p className="text-sm font-medium text-white truncate">
                    {chat.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{chat.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4 border-t border-white/10 space-y-2">
            {["profile", "settings", "logout"].map((item) => (
              <button
                key={item}
                onClick={() => handleRouteChange(item)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                  activeRoute === item
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="capitalize">{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.364-8.364l-.707.707M3.343 3.343l.707.707M21 12h1M4 12H3"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Doubt Solver</h1>
              <p className="text-sm text-gray-300">
                Your intelligent study companion
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Online</span>
          </div>
        </div>
      </div>
    </>
  );
}
