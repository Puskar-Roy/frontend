"use client";

import { useState } from "react";
import { createAPIClient } from "../lib/apiClient";
import { ChatMessage, Role, SummarizeDoubtRequestBody, SummarizeDoubtResponse } from "../types/api/chat";
import { useAuth } from "../context/AuthContext"; // 1. Import the useAuth hook

const api = createAPIClient(() => null); // Initialize with a placeholder

export const useSendMessage = (sessionId: string) => {
  const { user } = useAuth(); // 2. Get the authenticated user
  const [isSending, setIsSending] = useState<boolean>(false);

  const sendMessage = async (doubt: string): Promise<ChatMessage[] | null> => {
    // 3. Only proceed if there is a doubt, a session ID, and a logged-in user
    if (!doubt || !sessionId || !user) return null;

    setIsSending(true);
    try {
      // 4. Get the user's ID token for authentication
      const token = await user.getIdToken();

      const requestBody: SummarizeDoubtRequestBody = { doubt, sessionId };
      
      // 5. Make the authenticated API call
      const response = await api.POST('/api/v1/chat/summarize-doubt', requestBody, {
        headers: { Authorization: `Bearer ${token}` },
        withAuth: false, // Prevent default auth logic
      }) as SummarizeDoubtResponse;

      return response.fullHistory;
    } catch (error) {
      console.error("Failed to send message:", error);
      // Return a user-friendly error message as part of the chat
      const errorMessage: ChatMessage = {
        role: Role.model,
        parts: [{ text: "Sorry, I couldn't process your request. Please try again." }]
      };
      return [errorMessage];
    } finally {
      setIsSending(false);
    }
  };

  return { sendMessage, isSending };
};
