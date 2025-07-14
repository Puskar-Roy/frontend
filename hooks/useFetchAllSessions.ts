"use client";

import { useState, useEffect, useCallback } from "react";
import { createAPIClient } from "../lib/apiClient";
import { ChatHistoryItem } from "../types/chat";
import { useAuth } from "../context/AuthContext"; // 1. Import the useAuth hook

const api = createAPIClient(() => null); // Initialize with a placeholder

export const useFetchAllSessions = () => {
  const { user } = useAuth(); // 2. Get the authenticated user
  const [sessions, setSessions] = useState<ChatHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    // 3. Only proceed if the user is authenticated
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // 4. Get the user's ID token
      const token = await user.getIdToken();
      
      // 5. Make the authenticated API call
      const response = await api.GET("/api/v1/chat/sessions", {
        headers: { Authorization: `Bearer ${token}` },
        withAuth: false, // Prevent default auth logic
      }) as ChatHistoryItem[];
      
      setSessions(response);
    } catch (error) {
      console.error("Failed to fetch chat sessions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]); // The hook will re-run if the user object changes

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]); // Effect is now dependent on the memoized fetch function

  return { sessions, setSessions, isLoading };
};
