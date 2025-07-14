"use client";
import React, { useState } from "react";
import { Video, Plus, Users } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [userName, setUserName] = useState(user?.displayName || "User");
  const [meetingSlug, setMeetingSlug] = useState("");

  const generateMeetingSlug = () => {
    const adjectives = [
      "quick",
      "bright",
      "calm",
      "bold",
      "wise",
      "cool",
      "warm",
      "fast",
    ];
    const nouns = [
      "tiger",
      "eagle",
      "river",
      "mountain",
      "star",
      "ocean",
      "forest",
      "wind",
    ];
    const numbers = Math.floor(Math.random() * 1000);
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective}-${noun}-${numbers}`;
  };

  const handleJoinMeeting = () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!meetingSlug.trim()) {
      alert("Please enter a meeting slug");
      return;
    }

    router.push(`/meet/${meetingSlug.trim()}`);
  };

  const handleStartMeeting = () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    const slug = generateMeetingSlug();
    router.push(`/meet/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Video className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Video Meeting</h1>
          <p className="text-gray-400">Start or join a meeting instantly</p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="meetingSlug"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Meeting Slug
            </label>
            <input
              type="text"
              id="meetingSlug"
              value={meetingSlug}
              onChange={(e) => setMeetingSlug(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter existing meeting slug"
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleJoinMeeting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Join Meeting
            </button>

            <button
              onClick={handleStartMeeting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Start New Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
