"use client";

import { useState, useEffect, useCallback } from "react";
import { createAPIClient } from "../lib/apiClient";
import { ChatMessage, ChatHistoryResponse } from "../types/api/chat";
import { useAuth } from "../context/AuthContext"; // 1. Import the useAuth hook

const api = createAPIClient(() => null); // Initialize with a placeholder

export const useFetchChatHistory = (sessionId: string | null) => {
  const { user } = useAuth(); // 2. Get the authenticated user
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    // 3. Only proceed if there is a session ID and a logged-in user
    if (!sessionId || !user) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      // 4. Get the user's ID token for authentication
      const token = await user.getIdToken();
      
      // 5. Make the authenticated API call
      const response = await api.GET(`/api/v1/chat/get-chat-history/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withAuth: false, // Prevent default auth logic
      }) as ChatHistoryResponse;
      
      setMessages(response.history);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      console.error("Failed to fetch chat history:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, user]); // The hook will re-run if the sessionId or user changes

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { messages, setMessages, isLoading, error, refetch: fetchHistory };
};
