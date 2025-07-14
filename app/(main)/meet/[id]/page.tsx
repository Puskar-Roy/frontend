"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useAuth } from "../../../../context/AuthContext";

const serverUrl = "wss://happycare-n00earcz.livekit.cloud";

const MeetingPage: React.FC = () => {
  const { id } = useParams(); 
  const slug = String(id);
  const { user, token: authToken } = useAuth();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (!user?.displayName || !authToken || !slug) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/connect/get-meeting-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              participantName: user.displayName,
              roomName: slug,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to get token");
        }

        setToken(data.token);
      } catch (err: any) {
        console.error("Error getting token:", err);
        alert("Failed to join meeting: " + err.message);
      }
    };

    fetchToken();
  }, [user, authToken, slug]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p>
          Joining meeting{" "}
          <span className="text-blue-400 font-mono">{slug}</span>...
        </p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default MeetingPage;
