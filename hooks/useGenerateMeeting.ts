"use client";
import { useAuth } from "../context/AuthContext";
import { createAPIClient } from "../lib/apiClient";

export const useGenerateMeeting = () => {
  const { user, token } = useAuth();
  const api = createAPIClient(() => token);

  const generateToken = async ({
    
    slug,
  }: {
  
    slug: string;
  }) => {
    try {
      const response = await api.POST(
        "/api/v1/connect/get-meeting-token",
        {
          participantName: user?.displayName,
          roomName: slug,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          withAuth: true,
        }
      );
      console.log("Response - " + response?.data);
      
      return response?.data;
    } catch (error) {
      console.error("Error generating meeting token:", error);
      return null;
    }
  };

  return { generateToken };
};
