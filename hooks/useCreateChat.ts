"use client";

import { createAPIClient } from "../lib/apiClient";
import { v4 as uuidv4 } from "uuid";
import { NewChatResponse } from "../types/api/chat";
import { useAuth } from "../context/AuthContext"; // 1. Import the useAuth hook

export const useCreateChat = () => {
  // 2. Get the current user from the authentication context
  const { user } = useAuth();

  // 3. Initialize the API client with a placeholder function for the token.
  // The actual token will be fetched and passed manually with each request.
  const api = createAPIClient(() => null);

  const createNewChat = async (): Promise<string | null> => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // 4. Fetch the token just before making the API call.
      const token = await user.getIdToken();

      const newSessionId = uuidv4(); // Corrected variable name
      
      // 5. Make the API call, passing the token in the headers.
      // We also tell the apiClient to NOT run its default auth logic.
      const res = (await api.POST(
        "/api/v1/chat/new-chat", 
        { sessionId: newSessionId },
        { 
          headers: { Authorization: `Bearer ${token}` },
          withAuth: false // This is important to prevent conflicting auth logic
        }
      )) as NewChatResponse;
      
      return res.sessionId;
    } catch (error) {
      console.error("Error in useCreateChat:", error);
      return null;
    }
  };

  return createNewChat;
};
