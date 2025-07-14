"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "./Header";
import Sidebar from "./SideBar";
import { ChatHistoryItem } from "../types/chat";
import { useCreateChat } from "../hooks/useCreateChat";
import { useFetchAllSessions } from "../hooks/useFetchAllSessions"; // Import the new hook

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { sessionId } = useParams() as { sessionId: string };
  const createNewChat = useCreateChat();
  
  // Use the new hook to fetch all chat sessions
  const { sessions: chatHistory, setSessions: setChatHistory } = useFetchAllSessions();
  
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<string>('chat');

  // Derive the active state directly from the URL params
  const activeChatHistory = chatHistory.map(chat => ({
      ...chat,
      active: String(chat.id) === sessionId
  }));

  const handleSelectChat = (id: number) => {
    // Just navigate; the active state will be updated by the effect above
    router.push(`/chat/${id}`);
    setSidebarOpen(false); 
  };

  const handleNewChat = async (): Promise<void> => {
    try {
      const newSessionId = await createNewChat();
      if (newSessionId) {
        router.push(`/chat/${newSessionId}`);
      } else {
        console.error("Failed to create a new chat session.");
      }
    } catch (error) {
        console.error("An error occurred while creating a new chat:", error);
    } finally {
        setSidebarOpen(false);
    }
  };

  const handleRouteChange = (route: string): void => {
    setActiveRoute(route);
    setSidebarOpen(false);
    console.log(`Navigating to ${route}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNewChat={handleNewChat}
        chatHistory={activeChatHistory} // Pass the derived history with the correct active chat
        handleRouteChange={handleRouteChange}
        activeRoute={activeRoute}
        handleSelectChat={handleSelectChat}
      />
      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 h-full">
          {children}
        </main>
      </div>
    </div>
  );
}